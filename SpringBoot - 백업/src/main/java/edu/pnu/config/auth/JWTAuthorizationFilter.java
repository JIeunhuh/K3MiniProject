package edu.pnu.config.auth;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;

public class JWTAuthorizationFilter {

	@Autowired
	private MemberRepository memRepo;
	
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
								throws IOException, ServletException {
	String srcToken = request.getHeader("Authorization");
	if (srcToken == null || !srcToken.startsWith("Bearer ")) {
		chain.doFilter(request, response);
		return;
	}
	String jwtToken = srcToken.replace("Bearer ", "");
	String username = JWT.require(Algorithm.HMAC256("edu.pnu.jwtkey")).build().verify(jwtToken).getClaim("id").asString();
	// 토큰에서 얻은 username으로 DB를 검색해서 사용자를 찾고
	Optional<Member> opt = memRepo.findById(username);
	if (!opt.isPresent()) {
		chain.doFilter(request, response);
		return;
	}

	Member findmember = opt.get();
	// DB에서 읽은 사용자 정보를 이용해서 UserDetails 타입의 객체를 만들어서
	User user = new User(findmember.getId(), findmember.getPassword(), findmember.getAuthorities());
	// Authentication 객체를 생성 : 사용자명과 권한 관리를 위한 정보를 입력(암호는 필요없음)
	Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
	// 시큐리티 세션에 등록한다.
	SecurityContextHolder.getContext().setAuthentication(auth); 
	chain.doFilter(request, response);
}
}

package edu.pnu.config.filter;


import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private AuthenticationManager authenticationManager; // 생성자에서 파라미터로 전달 받는다.
	
	// Logger 인터페이스를 구현한 객체를 생성
    private static final Logger log = LoggerFactory.getLogger(Member.class);
    
    private MemberRepository memRepo;  
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, MemberRepository memRepo) {
		// TODO Auto-generated constructor stub
		super(authenticationManager);
		this.memRepo = memRepo;
		this.authenticationManager = authenticationManager;
		//setAuthenticationManager(authenticationManager);
	}

    

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException,
	ServletException{
		chain.doFilter(request, response);
	}
	
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse resp)

		throws AuthenticationException {
		// req의 Body에 JSON으로 담겨오는 username/password를 읽어서 Member 객체로 받아온다.
		ObjectMapper om = new ObjectMapper();
		try {
			Member member = om.readValue(req.getInputStream(), Member.class);
			Authentication authToken = new UsernamePasswordAuthenticationToken(member.getId(), member.getPassword());
			Authentication auth = authenticationManager.authenticate(authToken);
			// 읽어 들인 정보가 정확한지 콘솔에 출력해본다.
			log.info("attemptAuthentication :[" + member.getName() + "]");
			return auth;
		} catch (Exception e) {
			log.info("Not Authenticated : " + e.getMessage() );
			e.printStackTrace();
		}
		return null;
	}



//	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse resp)
//			throws AuthenticationException {
//			// req의 Body에 JSON으로 담겨오는 username/password를 읽어서 Member 객체로 받아온다.
//			ObjectMapper om = new ObjectMapper();
//			try {
//				Member member = om.readValue(req.getInputStream(), Member.class);
//				Authentication authToken = new UsernamePasswordAuthenticationToken(member.getId(), member.getPassword());
//				Authentication auth = authenticationManager.authenticate(authToken);
//				// 읽어 들인 정보가 정확한지 콘솔에 출력해본다.
//				log.info("attemptAuthentication :[" + member.getName() + "]");
//				return auth;
//			} catch (Exception e) {
//				log.info("Not Authenticated : " + e.getMessage() );
//			}
//			return null;
//		}

	
//	@Override
//	// 로그인 인증 시도를 위한 메소드 오버라이딩
//	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse resp)
//		throws AuthenticationException {
//		// 여기에서 인증을 위한 토큰을 생성해서 인증을 요청하고 성공하면 세션에 인증정보를 등록한다.
//		return null;
//	}

	@Override
	// 성공적으로 로그인 인증이 완료된 후 처리를 위한 메소드 오버라이딩
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
		// JWT 토큰을 만들어서 resp의 Header에 등록한다.
		User user = (User)authResult.getPrincipal();
		log.info("successfulAuthentication:" + user.toString());
		// JWT 생성
		String jwtToken = JWT.create()
							.withClaim("username", user.getUsername())
							.withExpiresAt(new Date(System.currentTimeMillis()+1000*60*10))
							.sign(Algorithm.HMAC256("edu.pnu.jwtkey"));
		// 응답 Header에 "Authorization"이라는 키를 추가해서 JWT를 설정
		// Bearer : JWT임을 나타내는 용어; Basic : "Basic "+Base64(username:password)
		response.addHeader("Authorization", "Bearer " + jwtToken);
		chain.doFilter(request, response);
	}


}

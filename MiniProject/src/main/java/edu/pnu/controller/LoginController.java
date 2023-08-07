package edu.pnu.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Member;
import edu.pnu.service.JwtService;
import edu.pnu.service.MemberService;

@RestController
public class LoginController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?>getToken(@RequestBody Member member){
		
		System.out.println("member : " + member);
		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(member.getId(), member.getPassword());
		Authentication auth = authenticationManager.authenticate(creds);
		
		//토큰 생성
		String jwts = jwtService.getToken(auth.getName());
		
		//생성된 토큰으로 응답을 생성
		return ResponseEntity.ok()
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
				.build();
	}

    @PostMapping("/register")
    public String register(@RequestBody Member member) {
        memberService.createMember(member);
        return "Registration successful!";
    }
}



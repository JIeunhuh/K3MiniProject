package edu.pnu.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
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
	
//	@PostMapping("/login")
//	public ResponseEntity<?>getToken(@RequestBody Member member){
//		
//		System.out.println("member : " + member);
//		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(member.getId(), member.getPassword());
//		Authentication auth = authenticationManager.authenticate(creds);
//		
//		//토큰 생성
//		String jwts = jwtService.getToken(member);
//		
//		//생성된 토큰으로 응답을 생성
//		return ResponseEntity.ok()
//				.header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
//				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
//				.build();
//	}
	
    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody Member member) {
        
        System.out.println("member : " + member);
        
        // 서비스 레이어에서 회원 정보 조회 및 인증
        Member authenticatedMember = memberService.authenticate(member.getId(), member.getPassword());
        
        if (authenticatedMember != null) {
            // 인증 성공한 경우에만 토큰 생성
            
            String jwts = jwtService.getToken(authenticatedMember);
            
            // 생성된 토큰으로 응답을 생성
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                    .build();
        } else {
            // 인증 실패한 경우
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Member member) {
//        memberService.createMember(member);
//        return "Registration successful!";
    	try {
    		memberService.createMember(member);
    		return ResponseEntity.ok("계정이 생성되었습니다.");
    	} catch (IllegalArgumentException e) {
			// TODO: handle exception
    		return ResponseEntity.badRequest().body(e.getMessage());
		}
    }
    
    @GetMapping("/allmembers")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    
}



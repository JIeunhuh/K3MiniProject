package edu.pnu.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
	
	@GetMapping("/auth")
	public @ResponseBody String auth(@AuthenticationPrincipal User user) {
		return user.toString();
	}
	
//    @PostMapping("/login")
//    public String login(@RequestBody Member loginRequest) {
//        Member member = memberService.getMember(loginRequest);
//        if (member != null && member.isPasswordMatch(loginRequest.getPassword())) {
//            // Authentication successful
//        	System.out.println("LoginSuccess");
//            return "Login successful!";
//        } else {
//            // Authentication failed
//        	System.out.println("Login Failed");
//            return "Login failed. Please check your credentials.";
//        }
//    }

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?>getToken(@RequestBody Member credentials){
		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(credentials.getId(), credentials.getPassword());
		Authentication auth = authenticationManager.authenticate(creds);
		
		//토큰 생성
		String jwts = jwtService.getToken(auth.getName());
		
		//생성된 토큰으로 응답을 생성
		return ResponseEntity.ok()
				.header(HttpHeaders.AUTHORIZATION, "Bearer" + jwts)
				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
				.build();
	}

    @PostMapping("/register")
    public String register(@RequestBody Member member) {
        memberService.createMember(member);
        return "Registration successful!";
    }

//    @Autowired
//    private MemberService memberService;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;

//    @PostMapping("/login")
//    public String login(@RequestBody Member member) {
//        String userid = member.getId();
//        String password = member.getPassword();
//
//        // 사용자 정보를 데이터베이스에서 조회
//        Member storedMember = memberService.getMember(member);
//        if (storedMember == null) {
//            return "존재하지 않는 사용자입니다.";
//        }
//
//        // 사용자명과 비밀번호가 일치하는지 검사
//        if (userid.equals(storedMember.getId()) && passwordEncoder.matches(password, storedMember.getPassword())) {
//            // 사용자 인증을 시도하여 SecurityContextHolder에 인증 정보를 저장
//            Authentication authentication = new UsernamePasswordAuthenticationToken(userid, null, storedMember.getAuthorities());
//            authentication = authenticationManager.authenticate(authentication);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            return "로그인 성공!";
//        } else {
//            return "아이디 또는 비밀번호가 일치하지 않습니다.";
//        }
//    }
}

package edu.pnu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import edu.pnu.domain.Member;
import edu.pnu.service.MemberService;

//api명세서 정리되어 있음
@SessionAttributes("member")
@RestController
public class LoginController {
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:index.html";
	}
	
//	@GetMapping("/login")
//	public void loginView() {
//	}
	
	@PostMapping("/login")
	public String login(Member member, Model model) {
		Member findMember = memberService.getMember(member);
		if(findMember != null && findMember.getPassword().equals(member.getPassword())) {
			model.addAttribute("member", findMember);
			return "redirect:getBoardList";
		} else {
			return "redirect:/loginError";
		}
	}
	
//	@PostMapping("/login")
//	public List<Member> getAllMember(){
//	    return memberService.getAllMembers();
//	}
	
	@GetMapping("/create")
	public void createView() {
	}
	
	@PostMapping("/create")
	public String createMember(Member member) {
		memberService.createMember(member);
		return "redirect:index.html";
	}
	@GetMapping("/auth")
	@ResponseBody 
	public String auth(@AuthenticationPrincipal OAuth2User user) {
		if(user == null) {
			return "user is null";
		}
		return user.toString();
	}
	
    @GetMapping("/loginSuccess")
    public String loginSuccess() {
        // 로그인 성공 시 이동할 페이지 (여기서는 임시로 "/welcome" 페이지로 이동)
        return "redirect:/welcome";
    }
    
    @GetMapping("/loginGoogle")
    public String showLoginForm() {
        // 구글 OAuth2 로그인 페이지로 이동합니다.
        return "redirect:/oauth2/authorization/google";
    }
}

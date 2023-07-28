package edu.pnu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import edu.pnu.domain.Member;
import edu.pnu.service.MemberService;

//api명세서 정리되어 있음
@SessionAttributes("member")
@Controller
public class LoginController {
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:index.html";
	}
	
	@GetMapping("/login")
	public void loginView() {
	}
	
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
	
	@GetMapping("/create")
	public void createView() {
	}
	
	@PostMapping("/create")
	public String createMember(Member member) {
		memberService.createMember(member);
		return "redirect:index.html";
	}
}

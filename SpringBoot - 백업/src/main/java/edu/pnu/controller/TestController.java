package edu.pnu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	@GetMapping("/home")
	public void home(){
		//return "home";
	}
	
	@GetMapping("/model")
	public String model(Model model){
		
		model.addAttribute("data", "minbeom");
		return "model";
	}
}

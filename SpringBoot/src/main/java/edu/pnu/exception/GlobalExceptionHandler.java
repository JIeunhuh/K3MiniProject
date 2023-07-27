package edu.pnu.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(BoardException.class)
	public String handleustomException(BoardException exception, Model model) {
		model.addAttribute("exception",exception);
		return "/errors/globalError";
	}
	@ExceptionHandler(Exception.class)
	public String handleCustomException(Exception exception, Model model) {
		model.addAttribute("exception",exception);
		return "/errors/globalError";
	}
}

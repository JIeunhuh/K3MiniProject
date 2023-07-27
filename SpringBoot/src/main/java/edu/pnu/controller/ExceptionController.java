package edu.pnu.controller;


import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.pnu.exception.BoardNotFoundException;
import edu.pnu.exception.LoginException;

@Controller
public class ExceptionController {
	@RequestMapping("/boardError")
	public String boardError() {
		throw new BoardNotFoundException("검색된 게시글이 없습니다.");
	}
	
	@RequestMapping("/illegalArgumentError")
	public String ellegalArgumentError() {
		throw new IllegalArgumentException("부적절한 인자가 정달되었습니다.");
	}
	
	@RequestMapping("/sqlError")
	public String sqlError() throws SQLException{
		throw new SQLException("부적절한 sql문 입니다.");
	}
	
	@RequestMapping("/loginError")
	public String loginError() {
		throw new LoginException("등록되지 않은 아이디입니다.");
	}
}

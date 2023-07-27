package edu.pnu.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.pnu.board.board;
import edu.pnu.domain.Member;
import edu.pnu.service.BoardService;

@SessionAttributes("member")
@Controller
public class BoardController {

	//@RequestMapping("/getBoardList")
	//public String getBoardList(Model model) {
		//List<board> boardList = new ArrayList<board>();
		//for(int i= 1; i<=10; i++) {
			//board board = new board();
			//board.setSeq(new Long(i));
			//board.setTitle("계시판 프로그램 테스트");
			//board.setWriter("도우너");
			//board.setContent("계시판 프로그램 테스트입니다.");
			//board.setCreateDate(new Date());
			//board.setCnt(0L);
			//boardList.add(board);
			//}
		//	model.addAttribute("boardList", boardList);
	//return "getBoardList";
	//}
	@Autowired
	private BoardService boardService;
	
	@ModelAttribute("member")
	public Member setMember() {
		return new Member();
	}
	
	@GetMapping("/getBoardList")
	public String getBoardList(@ModelAttribute("member") Member member, Model model, board board) {
		if(member.getId() == null) {
			return "redirect:login";
		}
		model.addAttribute("boardList", boardService.getBoardList());
		return "getBoardList";
	}
	
	@GetMapping("/insertBoard")
	public String insertBoard(@ModelAttribute("member") Member member) {
		if(member.getId()==null) {
		return "redirect:login";
		}
		return "insertBoard";
	}

	@PostMapping("/insertBoard")
	public String insertBoardPost(@ModelAttribute("member") Member member,board board) {
		if(member.getId()==null) {
			return "redirect:login";
		}
		boardService.insertBoard(board);
		//return "getBoardList";
		return "redirect:getBoardList";
	}
	
	@GetMapping("/getBoard")
	public String getBoard(@ModelAttribute("member") Member member, board board,Model model) {
		//board board = boardService.getBoard(board.builder().seq(seq));
		if(member.getId()==null) {
			return "redirect:login";
		}
		model.addAttribute("board", boardService.getBoard(board));
		return "getBoard";
	}
	
	@PostMapping("/updateBoard")
	public String updateBoard(@ModelAttribute("member") Member member, board board) {
		if(member.getId()==null) {
			return "redirect:login";
		}
		boardService.updateBoard(board);
		return "redirect:getBoardList";
	}
	
	@GetMapping("/deleteBoard")
	public String deleteBoard(@ModelAttribute("member") Member member, board board) {
		if(member.getId()==null) {
			return "redirect:login";
		}
		boardService.deleteBoard(board);
		return "redirect:getBoardList";
	}
}

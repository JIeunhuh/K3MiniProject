package edu.pnu.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Board;
import edu.pnu.service.BoardService;

@RestController
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
    @GetMapping("/getBoardList")
    public Page<Board> getBoardList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return boardService.getBoardList(pageable);
    }
    
    @PostMapping("insertBoard")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) {
        Board createdBoard = boardService.createBoard(board);
        return ResponseEntity.ok(createdBoard);
    }
}

package edu.pnu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import edu.pnu.domain.Board;

public interface BoardService {

	Page<Board> getBoardList(Pageable pageable);

	void insertBoard(Board board);

	Board getBoard(Board board);

	void updateBoard(Board board);

	void deleteBoard(Board board);

	List<Board> searchBoards(String keyword);

	Board createBoard(Board board);

}
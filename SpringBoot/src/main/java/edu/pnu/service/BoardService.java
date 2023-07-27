package edu.pnu.service;

import java.util.List;

import edu.pnu.board.board;

public interface BoardService {

	List<board> getBoardList();

	void insertBoard(board board);

	board getBoard(board board);

	void updateBoard(board board);

	void deleteBoard(board board);

	List<board> searchBoards(String keyword);

}
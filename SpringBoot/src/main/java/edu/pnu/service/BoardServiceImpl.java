package edu.pnu.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pnu.board.board;
import edu.pnu.persistence.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardRepository boardRepo;
	
	@Override
	public List<board> getBoardList(){
		return boardRepo.findAll();
	}
	@Override
	public void insertBoard(board board) {
		board.setCreateDate(new Date());
		board.setSeq(0L);
		boardRepo.save(board);
	}
	@Override
	public board getBoard(board board) {
		return boardRepo.findById(board.getSeq()).get();
	}
	
	@Override
	public void updateBoard(board board) {
		board findBoard = boardRepo.findById(board.getSeq()).get();
		findBoard.setTitle(board.getTitle());
		findBoard.setContent(board.getContent());
		boardRepo.save(findBoard);
	}
	
	@Override
	public void deleteBoard(board board) {
		boardRepo.deleteById(board.getSeq());
	}
}

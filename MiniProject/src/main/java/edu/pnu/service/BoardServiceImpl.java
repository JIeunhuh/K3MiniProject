package edu.pnu.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.persistence.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardRepository boardRepo;
	
	@Override
	public Page<Board> getBoardList(Pageable pageable){
		return boardRepo.findAll(pageable);
	}
	
    @Override
	public Board createBoard(Board board) {
        Board newBoard = new Board();
        newBoard.setTitle(board.getTitle());
        newBoard.setMemberId(board.getMemberId());
        newBoard.setContent(board.getContent());
        newBoard.setReview(board.getReview());
        newBoard.setCreateDate(new Date());
        
        //현재 로그인한 사용자의 정보를 가져와서 memberId로 저장
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String loggedInUser = authentication.getName();
//        newBoard.setMemberId(loggedInUser);

        return boardRepo.save(newBoard);
    }
	
	@Override
	public void insertBoard(Board board) {
		board.setCreateDate(new Date());
		board.setSeq(0L);
		boardRepo.save(board);
	}
	
	@Override
	public Board getBoard(Board board) {
		return boardRepo.findById(board.getSeq()).get();
	}
	
	@Override
	public void updateBoard(Board board) {
		Board findBoard = boardRepo.findById(board.getSeq()).get();
		findBoard.setTitle(board.getTitle());
		findBoard.setContent(board.getContent());
		boardRepo.save(findBoard);
	}
	
	@Override
	public void deleteBoard(Board board) {
		boardRepo.deleteById(board.getSeq());
	}
	
	@Override
	public List<Board> searchBoards(String keyword){
		return boardRepo.findByTitleContainingOrContentContaining(keyword, keyword);
	}
}

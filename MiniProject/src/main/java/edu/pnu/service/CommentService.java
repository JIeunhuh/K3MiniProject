package edu.pnu.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.domain.Comment;
import edu.pnu.domain.Member;
import edu.pnu.domain.Restaurant;
import edu.pnu.domain.Review;
import edu.pnu.persistence.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private MemberService memberService;
	
	public Comment createComment(Comment comment) {
		Comment newComment = new Comment();
		newComment.setSeq(comment.getSeq());
		newComment.setNickname(comment.getNickname());
		newComment.setContent(comment.getContent());
		newComment.setCreateDate(new Date());
		
		return commentRepository.save(newComment);
	}
	
	public List<Comment> getAllComments(){
		return commentRepository.findAll();
	}
	
    public List<Comment> getCommentBySeq(Long seq) {
        return commentRepository.findAllBySeq(seq);
    }
    
	public void deleteComment(Comment comment) {
		commentRepository.deleteById(comment.getId());
	}

}

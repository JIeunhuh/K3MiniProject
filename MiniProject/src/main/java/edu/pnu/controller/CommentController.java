package edu.pnu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Comment;
import edu.pnu.service.BoardService;
import edu.pnu.service.CommentService;

@RestController
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private BoardService boardService;
	
    @PostMapping("/insertComment")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.createComment(comment);
        return ResponseEntity.ok(createdComment);
    }
    
    @GetMapping("/getCommentList/{seq}")
    public List<Comment> getCommentBySeq(@PathVariable Long seq) {
    	return commentService.getCommentBySeq(seq);
    }

    
    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Comment id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting board");
        }
    }
    
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
//        commentService.deleteComment(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}

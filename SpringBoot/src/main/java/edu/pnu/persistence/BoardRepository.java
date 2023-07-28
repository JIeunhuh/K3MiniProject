package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.pnu.board.board;
// list 형식으로 Board 넘겨줌
public interface BoardRepository extends JpaRepository<board, Long>{
	List<board> findByTitleContainingOrContentContaining(String keyword1, String keyword2);
}

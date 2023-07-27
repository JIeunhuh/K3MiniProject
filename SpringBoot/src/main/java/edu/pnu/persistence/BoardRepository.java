package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.pnu.board.board;

public interface BoardRepository extends JpaRepository<board, Long>{
	List<board> findByTitleContainingOrContentContaining(String keyword1, String keyword2);
}

package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.Board;
// list 형식으로 Board 넘겨줌
public interface BoardRepository extends JpaRepository<Board, Long>{
	List<Board> findByTitleContainingOrContentContaining(String keyword1, String keyword2);
}

package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.pnu.board.board;

public interface BoardRepository extends JpaRepository<board, Long>{

}

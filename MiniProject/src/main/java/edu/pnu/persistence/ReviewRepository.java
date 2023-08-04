package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.Review;
// list 형식으로 Board 넘겨줌
public interface ReviewRepository extends JpaRepository<Review, Long>{
	
}

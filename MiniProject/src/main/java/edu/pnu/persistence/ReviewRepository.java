package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.domain.Review;
// list 형식으로 Board 넘겨줌
public interface ReviewRepository extends JpaRepository<Review, Long>{
    // 해당 레스토랑의 리뷰 목록을 조회하는 메서드
    List<Review> findByRestId(int restId);
}

package edu.pnu.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Review;
import edu.pnu.persistence.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepo;
	
	public Page<Review> getReviewList(Pageable pageable){
		return reviewRepo.findAll(pageable);
	}
	
	public List<Review> getReviewByrestId(Integer restId){
		return reviewRepo.findAll().stream()
				.filter(r -> r.getRestId().equals(restId))
				.collect(Collectors.toList());
	}

    public Review createReview(Review review) {
        Review newReview = new Review();
        newReview.setRestId(review.getRestId());
        newReview.setReviewScore(review.getReviewScore());
        newReview.setNickname(review.getNickname());
        newReview.setContent(review.getContent());
        newReview.setDate(new Date());
        
        //현재 로그인한 사용자의 정보를 가져와서 memberId로 저장
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String loggedInUser = authentication.getName();
//        newBoard.setMemberId(loggedInUser);

        return reviewRepo.save(newReview);
    }
    
	public void deleteReview(Review review) {
		reviewRepo.deleteById(review.getId());
	}

}

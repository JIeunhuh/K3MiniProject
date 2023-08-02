package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pnu.restaurant.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    // 추가적인 쿼리 메서드가 필요하면 여기에 추가할 수 있습니다.
	List<Restaurant> findAllByCity(String city);
}
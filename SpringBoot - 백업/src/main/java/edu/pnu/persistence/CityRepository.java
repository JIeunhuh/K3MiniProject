package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.pnu.restaurant.City;

public interface CityRepository extends JpaRepository<City, Long>{
	@Query(value = "SELECT distinct city, city_gu FROM restaurant", nativeQuery = true)
    List<Object[]> findAllCitiesWithGu();
}

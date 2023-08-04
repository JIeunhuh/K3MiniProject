package edu.pnu.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Restaurant;
import edu.pnu.persistence.CityRepository;
import edu.pnu.persistence.RestaurantRepository;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    
    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> getRestaurantsByCityAndDistrict(String city, String cityGu) {
        return restaurantRepository.findAll().stream()
                .filter(r -> r.getCity().equals(city) && r.getCity_gu().equals(cityGu))
                .collect(Collectors.toList());
    }
    
    @Autowired
    private CityRepository cityRepository;

    public List<Object[]> getAllCities() {
        return cityRepository.findAllCitiesWithGu();
    }

	public List<Restaurant> getRestaurantsByCity(String city) {
        return restaurantRepository.findAll().stream()
                .filter(r -> r.getCity().equals(city))
                .collect(Collectors.toList());
	}
}
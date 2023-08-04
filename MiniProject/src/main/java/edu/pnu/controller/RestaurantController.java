package edu.pnu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Restaurant;
import edu.pnu.service.RestaurantService;

@RestController
public class RestaurantController {
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }
    
    @GetMapping("/restaurants/{city}/{city_gu}")
    public List<Restaurant> getRestaurantsByCityAndDistrict(@PathVariable String city, @PathVariable String city_gu) {
    	return restaurantService.getRestaurantsByCityAndDistrict(city, city_gu);

    }
    
    @GetMapping("/restaurants/{city}")
    public List<Restaurant> getRestaurantsByCity(@PathVariable String city) {
    	return restaurantService.getRestaurantsByCity(city);
    }
    
    @GetMapping("/cities")
    public List<Object[]> getAllCities() {
        return restaurantService.getAllCities();
    }
    
}
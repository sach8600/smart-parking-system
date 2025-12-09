package com.basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.basic.entity.ParkingSlot;

import java.util.List;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    
    List<ParkingSlot> findByCity(String city);

    // Custom query to fetch distinct city names
    @Query("SELECT DISTINCT p.city FROM ParkingSlot p")
    List<String> findDistinctCities();
    
    @Query("SELECT DISTINCT p.city, p.address FROM ParkingSlot p")
    List<Object[]> findDistinctCitiesWithAddress();
    
    
    
}

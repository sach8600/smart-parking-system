package com.basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.basic.entity.ParkingBooking;

@Repository
public interface ParkingBookingRepository extends JpaRepository<ParkingBooking, Long> {
}
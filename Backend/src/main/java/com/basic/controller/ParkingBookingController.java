package com.basic.controller;

import com.basic.dto.ApiResponse;
import com.basic.dto.ParkingBookingDTO;
import com.basic.entity.ParkingBooking;
import com.basic.service.ParkingBookingService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingBookingController {

    @Autowired
    private ParkingBookingService parkingBookingService;

    @PostMapping("/book")
    public ResponseEntity<ApiResponse<?>> bookParkingSlot(@Valid @RequestBody ParkingBookingDTO dto) {
        ParkingBooking saved = parkingBookingService.bookParkingSlot(dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Slot booked successfully", saved.getId()));
    }
}

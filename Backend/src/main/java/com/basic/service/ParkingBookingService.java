package com.basic.service;

import com.basic.dto.ParkingBookingDTO;
import com.basic.entity.ParkingBooking;
import com.basic.repository.ParkingBookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParkingBookingService {
    @Autowired
    private ParkingBookingRepository parkingBookingRepository;

    public ParkingBooking bookParkingSlot(ParkingBookingDTO dto) {
        ParkingBooking p = new ParkingBooking();
        p.setName(dto.getName());
        p.setVehicleNo(dto.getVehicleNo());
        p.setParkingHours(dto.getParkingHours());
        p.setMobileNo(dto.getMobileNo());
        return parkingBookingRepository.save(p);
    }
}

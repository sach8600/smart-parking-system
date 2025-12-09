package com.basic.service;

import com.basic.entity.ParkingSlot;
import com.basic.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {
    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public List<ParkingSlot> getParkingSlotsByCity(String city) {
        return parkingSlotRepository.findByCity(city);
    }

    public List<String> getAvailableCities() {
        return parkingSlotRepository.findDistinctCities();
    }

    public ParkingSlot addParkingSlot(ParkingSlot parkingSlot) {
        return parkingSlotRepository.save(parkingSlot);
    }

    public List<Object[]> getDistinctCitiesWithAddress() {
        return parkingSlotRepository.findDistinctCitiesWithAddress();
    }
}

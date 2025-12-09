package com.basic.controller;

import com.basic.entity.ParkingSlot;
import com.basic.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    @GetMapping("/home")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to Smart Parking!");
    }

    @GetMapping("/about")
    public ResponseEntity<String> about() {
        return ResponseEntity.ok("About Smart Parking");
    }

    @GetMapping("/parking/search")
    public ResponseEntity<List<ParkingSlot>> searchParkingByCity(@RequestParam String city) {
        return ResponseEntity.ok(parkingSlotService.getParkingSlotsByCity(city));
    }

    @PostMapping("/parking/add")
    public ResponseEntity<ParkingSlot> addParkingSlot(@RequestBody ParkingSlot p) {
        return ResponseEntity.ok(parkingSlotService.addParkingSlot(p));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAvailableCities() {
        return ResponseEntity.ok(parkingSlotService.getAvailableCities());
    }

    @GetMapping("/cities-with-address")
    public ResponseEntity<List<Object[]>> getDistinctCitiesWithAddress() {
        return ResponseEntity.ok(parkingSlotService.getDistinctCitiesWithAddress());
    }
}

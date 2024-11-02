package com.wachichaw.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wachichaw.backend.entity.RsvpEntity;
import com.wachichaw.backend.service.RsvpService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/rsvp")
public class RsvpController {

    @Autowired
    RsvpService rsvpService;

    // Check
    @GetMapping("/print")
    public String print(){
        return "Hello, Mother FudgeBar!";
    }
    
    // Create
    @PostMapping("/save")
    public RsvpEntity saveReservation(@RequestBody RsvpEntity rsvp){
        return rsvpService.saveReservation(rsvp);
    }

    // Get All
    @GetMapping("/getAll")
    public List<RsvpEntity> getAllReservations(){
        return rsvpService.getAllReservations();
    }

    // Update by ID
    @PutMapping("/update/{rsvpId}")
    public RsvpEntity updateReservation(@PathVariable int rsvpId, @RequestBody RsvpEntity rsvp){
        return rsvpService.updateReservation(rsvpId, rsvp);
    }

    // Delete by ID
    @DeleteMapping("/delete/{rsvpId}")
    public String deleteReservation(@PathVariable int rsvpId){
        return rsvpService.deleteReservation(rsvpId);
    }
}

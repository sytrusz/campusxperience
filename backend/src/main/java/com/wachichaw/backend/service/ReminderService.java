package com.wachichaw.backend.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.wachichaw.backend.entity.ReminderEntity;
import com.wachichaw.backend.repository.ReminderRepo;

import java.util.NoSuchElementException;

@Service
public class ReminderService {
    @Autowired
    private ReminderRepo reminderRepo;

    public ReminderService(){
        super();
    }

    // Create
    public ReminderEntity saveReminder(ReminderEntity reminder) {
        return reminderRepo.save(reminder);
    }

    // Get all
    public List<ReminderEntity> getAllReminder() {
        return reminderRepo.findAll();
    }

    // Get by ID
    public Optional<ReminderEntity> getReminderById(int id) {
        return reminderRepo.findById(id);
    }

    // Update by ID
    @SuppressWarnings("finally")
    public ReminderEntity updateReminder(int id, ReminderEntity updatedReminder) {
        ReminderEntity ReminderEntity = new ReminderEntity();

        try{
            ReminderEntity = reminderRepo.findById(id).get();
            
            ReminderEntity.setEvent(updatedReminder.getEvent());
            ReminderEntity.setUser(updatedReminder.getUser());
            ReminderEntity.setReminderTime(updatedReminder.getReminderTime());
            ReminderEntity.setReminderType(updatedReminder.getReminderType());

        }catch(NoSuchElementException nex){
            throw new Exception ("Reminder " + id + " not found");
        }finally{
            return reminderRepo.save(ReminderEntity);
        }
    }

    // Delete by ID
    public String deleteReminder(int id) {
        String msg = " ";
        if (reminderRepo.findById(id)!=null){
            reminderRepo.deleteById(id);
            msg = "Reminder record successfully deleted!";
        }else
            msg = id + "NOT FOUND!";
        return msg;
    }

}
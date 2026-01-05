package com.smartinternship.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.service.InternshipService;

@Component
public class DataLoader implements CommandLineRunner {

    private final InternshipService internshipService;

    public DataLoader(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @Override
    public void run(String... args) {

        internshipService.saveInternship(
            new Internship("Backend Intern", "Infosys", "Hyderabad", "3 months")
        );
        internshipService.saveInternship(
            new Internship("Frontend Intern", "TCS", "Bangalore", "6 months")
        );
        internshipService.saveInternship(
            new Internship("Data Science Intern", "Amazon", "Chennai", "3 months")
        );

        System.out.println("✅ Sample internships loaded");
    }
}

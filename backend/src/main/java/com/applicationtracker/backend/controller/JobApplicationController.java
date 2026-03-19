package com.applicationtracker.backend.controller;

import com.applicationtracker.backend.dto.JobApplicationDto;
import com.applicationtracker.backend.entity.ApplicationStatus;
import com.applicationtracker.backend.entity.JobApplication;
import com.applicationtracker.backend.entity.User;
import com.applicationtracker.backend.repository.JobApplicationRepository;
import com.applicationtracker.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

  private final JobApplicationRepository jobApplicationRepository;
  private final UserRepository userRepository;

  public JobApplicationController(
      JobApplicationRepository jobApplicationRepository,
      UserRepository userRepository) {
    this.jobApplicationRepository = jobApplicationRepository;
    this.userRepository = userRepository;
  }

  @GetMapping
  public List<JobApplicationDto> getAllApplications() {
    return jobApplicationRepository.findAll().stream()
        .map(this::toDto)
        .toList();
  }

  @PostMapping("/seed")
  public ResponseEntity<List<JobApplicationDto>> seedDummyData() {
    User user = userRepository.findByUsername("debug")
        .orElseGet(() -> {
          User newUser = new User();
          newUser.setUsername("debug");
          newUser.setPassword("debug");
          return userRepository.save(newUser);
        });

    List<JobApplication> applications = List.of(
        createApplication(user, "TechCorp Inc.", "Software Engineer", ApplicationStatus.INTERVIEW,
            "Reached out via LinkedIn. Technical interview scheduled for next week.",
            LocalDate.of(2025, 3, 10), LocalDate.of(2025, 3, 25)),
        createApplication(user, "DataFlow Solutions", "Full Stack Developer", ApplicationStatus.PENDING,
            "Applied through company website. Waiting for response.",
            LocalDate.of(2025, 3, 12), null),
        createApplication(user, "CloudNine Systems", "Junior Developer", ApplicationStatus.OFFER,
            "Received offer! Negotiating salary.",
            LocalDate.of(2025, 2, 28), LocalDate.of(2025, 3, 15)),
        createApplication(user, "StartupXYZ", "Frontend Developer", ApplicationStatus.REJECTED,
            "Went with another candidate. Will reapply in 6 months.",
            LocalDate.of(2025, 3, 1), null),
        createApplication(user, "Enterprise Co", "Backend Engineer", ApplicationStatus.PENDING,
            null, LocalDate.of(2025, 3, 18), null)
    );

    List<JobApplication> saved = jobApplicationRepository.saveAll(applications);
    List<JobApplicationDto> dtos = saved.stream().map(this::toDto).toList();
    return ResponseEntity.ok(dtos);
  }

  private JobApplication createApplication(
      User user, String company, String position, ApplicationStatus status,
      String notes, LocalDate appDate, LocalDate interviewDate) {
    JobApplication app = new JobApplication();
    app.setUser(user);
    app.setCompanyName(company);
    app.setPositionTitle(position);
    app.setApplicationStatus(status);
    app.setApplicationNotes(notes);
    app.setApplicationDate(appDate);
    app.setInterviewDate(interviewDate);
    return app;
  }

  private JobApplicationDto toDto(JobApplication app) {
    return new JobApplicationDto(
        app.getId(),
        app.getCompanyName(),
        app.getPositionTitle(),
        app.getApplicationStatus(),
        app.getApplicationNotes(),
        app.getApplicationDate(),
        app.getInterviewDate()
    );
  }
}

package com.applicationtracker.backend.service;

import com.applicationtracker.backend.dto.JobApplicationDTO;
import com.applicationtracker.backend.entity.JobApplication;
import com.applicationtracker.backend.entity.User;
import com.applicationtracker.backend.repository.UserRepository;
import com.applicationtracker.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {
  @Autowired
  private JobApplicationRepository jobApplicationRepository;

  @Autowired
  private UserRepository userRepository;

  public List<JobApplicationDTO> getAllApplications() {
    List<JobApplication> apps = jobApplicationRepository.findAll();
    return apps.stream().map(this::toDTO).collect(Collectors.toList());
  }

  public JobApplicationDTO createApplication(JobApplicationDTO dto) {
    User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User Not Found"));

    JobApplication app = new JobApplication();
    app.setUser(user);
    app.setCompanyName(dto.getCompanyName());
    app.setPositionTitle(dto.getPositionTitle());
    app.setApplicationStatus(dto.getApplicationStatus());
    app.setApplicationNotes(dto.getApplicationNotes());
    app.setApplicationDate(dto.getDateOfApplication());
    app.setInterviewDate(dto.getInterviewDate());

    JobApplication saved = jobApplicationRepository.save(app);
    return toDTO(saved);
  }

  private JobApplicationDTO toDTO(JobApplication app) {
    JobApplicationDTO dto = new JobApplicationDTO();
    dto.setId(app.getId());
    dto.setCompanyName(app.getCompanyName());
    dto.setPositionTitle(app.getPositionTitle());
    dto.setApplicationStatus(app.getApplicationStatus());
    dto.setApplicationNotes(app.getApplicationNotes());
    dto.setDateOfApplication(app.getApplicationDate());
    dto.setInterviewDate(app.getInterviewDate());
    return dto;
  }
}

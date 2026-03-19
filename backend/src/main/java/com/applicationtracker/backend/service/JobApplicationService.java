package com.applicationtracker.backend.service;

import com.applicationtracker.backend.dto.JobApplicationDTO;
import com.applicationtracker.backend.entity.JobApplication;
import com.applicationtracker.backend.entity.User;
import com.applicationtracker.backend.repository.UserRepository;
import com.applicationtracker.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationService
{
  @Autowired
  private JobApplicationRepository jobApplicationRepository;

  @Autowired
  private UserRepository userRepository;

  public JobApplication createApplication(JobApplicationDTO dto)
  {
    User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User Not Found"));

    JobApplication app = new JobApplication();
    app.setUser(user);
    app.setCompanyName(dto.getCompanyName());
    app.setPositionTitle(dto.getPositionTitle());
    app.setApplicationStatus(dto.getApplicationStatus());
    app.setApplicationNotes(dto.getApplicationNotes());
    app.setApplicationDate(dto.getDateOfApplication());
    app.setInterviewDate(dto.getInterviewDate());

    return jobApplicationRepository.save(app);
  }
}

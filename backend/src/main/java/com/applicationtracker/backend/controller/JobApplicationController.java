package com.applicationtracker.backend.controller;

import com.applicationtracker.backend.dto.JobApplicationDTO;
import com.applicationtracker.backend.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

  @Autowired
  private JobApplicationService jobApplicationService;

  @GetMapping
  public ResponseEntity<List<JobApplicationDTO>> getAllApplications(@RequestParam Long userId) {
    List<JobApplicationDTO> applications = jobApplicationService.getAllApplications(userId);
    return ResponseEntity.ok(applications);
  }

  @PostMapping
  public ResponseEntity<JobApplicationDTO> createApplication(@RequestBody JobApplicationDTO dto) {
    JobApplicationDTO saved = jobApplicationService.createApplication(dto);
    return ResponseEntity.ok(saved);
  }

  @PutMapping("/{id}")
  public ResponseEntity<JobApplicationDTO> updateApplication(
      @PathVariable Long id, @RequestBody JobApplicationDTO dto) {
    JobApplicationDTO updated = jobApplicationService.updateApplication(id, dto);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
    jobApplicationService.deleteApplication(id);
    return ResponseEntity.noContent().build();
  }
}

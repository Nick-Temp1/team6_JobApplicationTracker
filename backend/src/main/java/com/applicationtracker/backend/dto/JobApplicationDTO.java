package com.applicationtracker.backend.dto;

import com.applicationtracker.backend.entity.ApplicationStatus;
import java.time.LocalDate;

public class JobApplicationDTO
{
  private Long id;
  private String companyName;
  private String positionTitle;
  private ApplicationStatus applicationStatus;
  private String applicationNotes;
  private LocalDate dateOfApplication;
  private LocalDate interviewDate;
  private Long userId;

  public String getCompanyName() {
    return companyName;
  }

  public String getPositionTitle() {
    return positionTitle;
  }

  public ApplicationStatus getApplicationStatus() {
    return applicationStatus;
  }

  public String getApplicationNotes() {
    return applicationNotes;
  }

  public LocalDate getDateOfApplication() {
    return dateOfApplication;
  }

  public LocalDate getInterviewDate() {
    return interviewDate;
  }

  public Long getUserId() {
    return userId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }


  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public void setPositionTitle(String positionTitle) {
    this.positionTitle = positionTitle;
  }

  public void setApplicationStatus(ApplicationStatus applicationStatus) {
    this.applicationStatus = applicationStatus;
  }

  public void setApplicationNotes(String applicationNotes) {
    this.applicationNotes = applicationNotes;
  }

  public void setDateOfApplication(LocalDate dateOfApplication) {
    this.dateOfApplication = dateOfApplication;
  }

  public void setInterviewDate(LocalDate interviewDate) {
    this.interviewDate = interviewDate;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }
}

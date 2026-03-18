package com.applicationtracker.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
public class JobApplication
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(nullable = false)
  private String companyName;

  @Column(nullable = false)
  private String positionTitle;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ApplicationStatus applicationStatus;

  @Column(columnDefinition = "TEXT")
  private String applicationNotes;

  @Column(nullable = false)
  private LocalDate applicationDate;

  private LocalDate interviewDate;

  public Long getId() {
    return id;
  }

  public User getUser() {
    return user;
  }

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

  public LocalDate getApplicationDate() {
    return applicationDate;
  }

  public LocalDate getInterviewDate() {
    return interviewDate;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setUser(User user) {
    this.user = user;
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

  public void setApplicationDate(LocalDate applicationDate) {
    this.applicationDate = applicationDate;
  }

  public void setInterviewDate(LocalDate interviewDate) {
    this.interviewDate = interviewDate;
  }
}

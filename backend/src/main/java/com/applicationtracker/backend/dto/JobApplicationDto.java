package com.applicationtracker.backend.dto;

import com.applicationtracker.backend.entity.ApplicationStatus;

import java.time.LocalDate;

public record JobApplicationDto(
    Long id,
    String companyName,
    String positionTitle,
    ApplicationStatus applicationStatus,
    String applicationNotes,
    LocalDate applicationDate,
    LocalDate interviewDate
) {
}

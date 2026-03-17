package com.applicationtracker.backend.repository;

import com.applicationtracker.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long>
{
  List<JobApplication> findByUserId (Long userId);
}

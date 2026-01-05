package com.smartinternship.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinternship.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}

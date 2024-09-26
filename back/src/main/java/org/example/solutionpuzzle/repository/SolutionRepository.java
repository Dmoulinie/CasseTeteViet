package org.example.solutionpuzzle.repository;

import org.example.solutionpuzzle.entity.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Long> {
    List<Solution> findByGridContaining(String filter);
    boolean existsByGrid(String grid);
    Optional<Solution> findTopByOrderByIdDesc();

}
package org.example.solutionpuzzle.controller;

import org.example.solutionpuzzle.entity.Solution;
import org.example.solutionpuzzle.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/solutions")
public class SolutionController {
    @Autowired
    private SolutionService solutionService;

    @GetMapping("/generate")
    public ResponseEntity<List<Solution>> generateSolutions() {
        //TODO : calculer le temps execution
        List<Solution> solutions = SolutionService.findSolutions();
        solutionService.saveAll(solutions);
        return ResponseEntity.ok(solutions);
    }

    @GetMapping("/get/all")
    public List<Solution> getAllSolutions() {
        return solutionService.getAllSolutions();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Solution> getSolution(@PathVariable Long id) {
        Optional<Solution> solution = solutionService.getSolutionById(id);
        return solution.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Solution> updateSolution(@PathVariable Long id, @RequestBody Solution updatedSolution) {
        Optional<Solution> existingSolution = solutionService.getSolutionById(id);
        if (existingSolution.isPresent()) {
            Solution solution = existingSolution.get();
            solution.setGrid(updatedSolution.getGrid());
            solution.setStatus(updatedSolution.getStatus());
            solutionService.saveSolution(solution);
            return ResponseEntity.ok(solution);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSolution(@PathVariable Long id) {
        solutionService.deleteSolutionById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteSolution() {
        solutionService.deleteAllSolutions();

        return ResponseEntity.ok().build();
    }

}

package org.example.solutionpuzzle.controller;

import org.example.solutionpuzzle.entity.Solution;
import org.example.solutionpuzzle.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;


@RestController
@RequestMapping("/api/solutions")
public class SolutionController {
    @Autowired
    private SolutionService solutionService;

    @GetMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateSolutions() {
        // Start timing
        long startTime = System.currentTimeMillis();

        // Générer les solutions
        List<Solution> solutions = SolutionService.findSolutions();
        solutionService.saveAll(solutions);

        // Calculer le temps d'exécution
        long endTime = System.currentTimeMillis();
        long duration = (endTime - startTime);

        // Permet d'envoyer les solutions et le temps d'exécution en tant que réponse
        Map<String, Object> response = new HashMap<>();
        response.put("solutions", solutions);
        response.put("duration", duration);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyEquation(@RequestBody List<Integer> numbers) {
        return ResponseEntity.ok(SolutionService.verifyEquation(numbers.get(0), numbers.get(1), numbers.get(2), numbers.get(3), numbers.get(4), numbers.get(5), numbers.get(6), numbers.get(7), numbers.get(8)));
    }

    @PostMapping("/add")
    public ResponseEntity<Solution> addSolution(@RequestBody Solution solution) {

        solutionService.saveSolution(solution);
        return ResponseEntity.ok(solution);
    }


    @PostMapping("/calculate")
    public ResponseEntity<Double> calculateEquation(@RequestBody List<Integer> numbers) {
        return ResponseEntity.ok(SolutionService.calculateEquation(numbers.get(0), numbers.get(1), numbers.get(2), numbers.get(3), numbers.get(4), numbers.get(5), numbers.get(6), numbers.get(7), numbers.get(8)));
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

    @GetMapping("/get/lastId")
    public ResponseEntity<Long> getLastId() {
        return ResponseEntity.ok(solutionService.getLastId());
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

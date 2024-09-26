package org.example.solutionpuzzle.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String grid;  // The grid values as a string
    private String status;  // "correct" or "incorrect"
    private LocalDateTime createdTime = LocalDateTime.now();  // The time when the solution was created



    // Constructeur par défaut
    public Solution() {
    }

    // Constructeur complet
    public Solution(Long id, String grid, String status, LocalDateTime createdTime) {
        this.id = id;
        this.grid = grid;
        this.status = status;
        this.createdTime = createdTime;
    }



    // Getter et Setter pour id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }


    // Getter et Setter pour grid
    public String getGrid() {
        return grid;
    }
    public void setGrid(String grid) {
        this.grid = grid;
    }





    // Getter et Setter pour status
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }


    // Getter et Setter pour createdTime
    public LocalDateTime getCreatedTime() {
        return createdTime;
    }
    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }





}

import { Component } from '@angular/core';
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../services/api-service.service";
import {Solution} from "../../classes/Solution";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    NgbTooltip,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {
  constructor(private apiService: ApiService) {}

  generatedAllSolutions:boolean = false;

  solutions: Solution[] = [];

  searchTerm: string = ''; // Terme de recherche


  ngOnInit() {
    this.apiService.getAllSolutions().subscribe((data: any[]) => {
      console.log(data);
      this.solutions = data;
    });
  }

  generateAllSolutions() {
    //calculate to generate all solutions
    this.apiService.generateAllSolutions().subscribe((data: any[]) => {

      console.log("Generated all solutions");
      this.solutions = data;
      this.generatedAllSolutions = true;
    });
  }

  // Propriété calculée pour les solutions filtrées
  get filteredSolutions(): Solution[] {
    if (!this.searchTerm) {
      return this.solutions;
    }

    // Filtrer les solutions par recherche de searchNumber dans la grille
    return this.solutions.filter(solution =>
      solution.grid.includes(this.searchTerm) // Vérifie si searchNumber fait partie de solution.grid
    );
  }


  // Méthode de suppression de solution
  deleteSolution(solutionId: number) {
    this.apiService.deleteSolution(solutionId).subscribe(() => {
      // Supprimer la solution de la liste des solutions
      this.solutions = this.solutions.filter(solution => solution.id !== solutionId);
    });
  }


}

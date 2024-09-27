import { Component } from '@angular/core';
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../services/api-service.service";
import {Solution} from "../../classes/Solution";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataSolutionsService} from "../services/data-solutions.service";

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    NgbTooltip,
    NgForOf,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {
  constructor(private apiService: ApiService, private dataSolutionsService: DataSolutionsService ) {}

  // Donnée des solutions reçues
  receivedData: any;



  sendDataToCasseTete(solution: Solution, type: string) {
    this.dataSolutionsService.sendData([solution, type]);
  }

  generatedAllSolutions:boolean = false;
  solutions: Solution[] = [];
  searchTerm: string = ''; // Terme de recherche
  timeElapsed: number = 0; // Temps écoulé

  isEditing: boolean = false;
  solutionEditingId: number = 0;

  ngOnInit() {
    this.apiService.getAllSolutions().subscribe((data: any[]) => {
      console.log(data);
      this.solutions = data;
    });

    this.dataSolutionsService.data$.subscribe(data => {
      if (!data) {
        return;
      }
      this.receivedData = data;
      console.log("received data" + this.receivedData);
      if (this.receivedData[1] === 'addSolutionToList') {
        this.saveSolution(this.receivedData[0]);
      }
      if (this.receivedData[1] === 'editSolutionInList') {
        this.editSolution(this.receivedData[0]);
      }
      if (this.receivedData[1] === 'cancelEdit') {
        this.isEditing = false;
      }
    });
  }

  generateAllSolutions() {
    // Call API to generate all solutions
    this.apiService.generateAllSolutions().subscribe((data: any) => {
      console.log("Generated all solutions");
      console.log(data);

      // Access the 'duration' and 'solutions' properties of 'data'
      this.timeElapsed = data.duration;
      this.solutions = data.solutions;
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

  // Méthode d'ajout de solution
  saveSolution(solution: Solution) {
    // Check si la solution est déjà dans la liste des solutions
    if (this.solutions.some(s => s.grid === solution.grid)) {
      return;
    }
    // Récupérer l'id de la dernière solution
    if (this.solutions.length === 0) { // S'il n'y a pas de solutions dans la liste
      solution.id = 1;
      this.solutions.push(solution);
      return;
    }
    const lastId = this.solutions[this.solutions.length - 1].id;
    solution.id = lastId + 1;
    this.solutions.push(solution);
  }

  editSolution(solution: Solution) {
    // Trouver l'index de la solution à éditer
    const index = this.solutions.findIndex(s => s.id === solution.id);
    this.solutions[index] = solution;
    this.isEditing = false;
  }

  SendDataEditSolution(solution: Solution) {
    this.isEditing = true;
    this.solutionEditingId = solution.id;
    this.dataSolutionsService.sendData([solution, 'editSolution']);
  }

  isEditingChangeClass(solutionId: number) {
    return this.isEditing && this.solutionEditingId === solutionId ? 'editing' : '';
  }

  // Méthode de suppression de solution
  deleteSolution(solutionId: number) {
    this.apiService.deleteSolution(solutionId).subscribe(() => {
      // Supprimer la solution de la liste des solutions
      this.solutions = this.solutions.filter(solution => solution.id !== solutionId);
    });
  }

  deleteAllSolutions() {
    this.apiService.deleteAllSolutions().subscribe(() => {
      this.solutions = [];
    });
  }


}

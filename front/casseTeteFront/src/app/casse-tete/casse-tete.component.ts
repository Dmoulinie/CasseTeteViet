import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../services/api-service.service";
import {DataSolutionsService} from "../services/data-solutions.service";
import {Solution} from "../../classes/Solution";

@Component({
  selector: 'app-casse-tete',
  standalone: true,
  imports: [
    NgForOf,
    NgbTooltip,
    NgClass,
    NgIf
  ],
  templateUrl: './casse-tete.component.html',
  styleUrl: './casse-tete.component.scss'
})
export class CasseTeteComponent {
  constructor(private apiService: ApiService, private dataSolutionsService: DataSolutionsService ) {}

  // Donnée des solutions reçues
  receivedData: any;
  ngOnInit() {
    this.dataSolutionsService.data$.subscribe(data => {
      if (!data) {
        return;
      }
      this.receivedData = data;
      if(this.receivedData[1] === 'showSolution') {
        this.showSolution(this.receivedData[0]);
      }

      if (this.receivedData[1] === 'editSolution') {
        this.showSolution(this.receivedData[0]);
        this.solutionEditingId = this.receivedData[0].id;
        this.isEditing = true;
      }
    });
  }

  solutionEditingId: number = 0;
  isEditing: boolean = false;
  values: (number | null)[] = Array(9).fill(null); // Array to hold 9 values
  resultEquation: string = ''; // Variable to hold the result equation
  isvalid:boolean = false;
  areTwoValuesEqual: boolean = false;



  // Validate the input
  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    const index = parseInt(input.id, 10) - 1; // Adjust index based on input ID (1-9)

    // Validate the input value
    if (value < 1 || value > 9 || isNaN(value)) {
      input.value = '';
      this.values[index] = null; // Reset value in array
    } else {
      this.values[index] = value; // Update value in array
    }


    // Check if all values are filled
    if (this.isComplete()) {
      this.onComplete(); // Call the function when all values are complete
    }
  }

  // check if all 9 values are filled
  isComplete(): boolean {
    return this.values.every(value => value !== null );
  }



  // Function to be called when all values are complete
  onComplete(): void {
    // Get all 9 values
    if (this.hasDuplicates()) {
      this.areTwoValuesEqual = true; // Set flag to true if duplicates are found
      console.log('Duplicate values found. Calculation aborted.');
      return; // Exit the function to prevent calculation
    }
    this.areTwoValuesEqual = false; // Reset flag if no duplicates are found
    const [A, B, C, D, E, F, G, H, I] = this.values;
    this.apiService.calculateSolution(A,B,C,D,E,F,G,H,I).subscribe((response: string) => {
      // arrondir resultEquation à 2 chiffres après la virgule

      this.resultEquation = parseFloat(response).toFixed(2);
    });
    this.apiService.verifySolution(A,B,C,D,E,F,G,H,I).subscribe(response => {
      this.isvalid = response;
    });
  }

  // Réinitialiser les valeurs
  resetCalcul(): void {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    this.values = Array(9).fill(null);
    this.isvalid = false;
  }

// Méthode pour définir la classe CSS de l'input
  getInputClass(index: number): string {
    const currentValue = this.values[index];

    // Check si des valeurs sont égales
    for (let i = 0; i < this.values.length; i++) {
      if (i !== index && currentValue !== null && this.values[i] !== null) {
        if (currentValue === this.values[i]) {
          return 'input-equal'; // 2 nombres égaux
        }
      }
    }
    return 'input-unequal'; // Aucun nombre égal
  }

// Helper function to check for duplicate values
  hasDuplicates(): boolean {
    const uniqueValues = new Set(this.values.filter(value => value !== null));
    return uniqueValues.size !== this.values.length;
  }


  showSolution(solution: Solution): void {
    const [A, B, C, D, E, F, G, H, I] = JSON.parse(solution.grid);
    this.values = [A, B, C, D, E, F, G, H, I];
    const elements = document.querySelectorAll('input');

    // Les inputs sont créer par ligne et non par colonne donc on doit les assigner manuellement
    (document.getElementById('1') as HTMLInputElement).value = A.toString(); // Première case
    (document.getElementById('5') as HTMLInputElement).value = E.toString(); // Cinquième case
    (document.getElementById('6') as HTMLInputElement).value = F.toString(); // Sixième case
    (document.getElementById('2') as HTMLInputElement).value = B.toString(); // Deuxième case
    (document.getElementById('4') as HTMLInputElement).value = D.toString(); // Quatrième case
    (document.getElementById('7') as HTMLInputElement).value = G.toString(); // Septième case
    (document.getElementById('9') as HTMLInputElement).value = I.toString(); // Neuvième case
    (document.getElementById('3') as HTMLInputElement).value = C.toString(); // Troisième case
    (document.getElementById('8') as HTMLInputElement).value = H.toString(); // Huitième case
    this.onComplete();
  }

  saveSolution(): void {
    if (this.values.some(value => value === null)) {
      return;
    }
    const [A, B, C, D, E, F, G, H, I] = this.values;

    this.apiService.getLastSolutionId().subscribe((response: any) => { // Récupérer l'id de la dernière solution afin de ne pas avoir de doublons
      const newSolution = new Solution(response.id + 1, `[${A}, ${B}, ${C}, ${D}, ${E}, ${F}, ${G}, ${H}, ${I}]`, new Date(), this.isvalid ? 'correct' : 'incorrect');
      this.apiService.saveSolution(newSolution).subscribe((response: any) => { // Envoyer la solution à l'API pour l'ajouter à la base de données
        this.dataSolutionsService.sendData([newSolution, 'addSolutionToList']); // Envoyer la solution à la liste des solutions pour l'ajouter coté client
      });
    });
  }


  editSolution(): void {
    if (this.values.some(value => value === null)) { // Si le tableau est incomplet
      return;
    }
    const [A, B, C, D, E, F, G, H, I] = this.values; // Récupérer les valeurs
    const editedSolution = new Solution(this.solutionEditingId, `[${A}, ${B}, ${C}, ${D}, ${E}, ${F}, ${G}, ${H}, ${I}]`, new Date(), this.isvalid ? 'correct' : 'incorrect');
    this.apiService.updateSolution(this.solutionEditingId,editedSolution).subscribe((response: any) => {
      this.dataSolutionsService.sendData([editedSolution, 'editSolutionInList']); // Envoyer la solution à la liste des solutions pour l'éditer coté client
    });
    this.isEditing = false; // Sortir du mode édition
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.solutionEditingId = 0;
    this.resetCalcul();
    this.dataSolutionsService.sendData([this.solutionEditingId, 'cancelEdit']); // Envoyer un message pour annuler l'édition
  }


}


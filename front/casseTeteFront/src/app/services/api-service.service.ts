import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Solution} from "../../classes/Solution";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080/api/solutions';

  constructor(private http: HttpClient) { }

  getAllSolutions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/all`);
  }

  verifySolution(A: number | null, B: number | null, C: number | null, D: number | null, E: number | null, F: number | null, G: number | null, H: number | null, I: number | null): Observable<any> {
   const numberList = [A, B, C, D, E, F, G, H, I];
    return this.http.post<any>(`${this.apiUrl}/verify`, numberList);
  }

  calculateSolution(A: number | null, B: number | null, C: number | null, D: number | null, E: number | null, F: number | null, G: number | null, H: number | null, I: number | null): Observable<any> {
    const numberList = [A, B, C, D, E, F, G, H, I];
    return this.http.post<any>(`${this.apiUrl}/calculate`, numberList);
  }

  getLastSolutionId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/lastId`);
  }

  getSolutionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  saveSolution(solution: Solution): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, solution);
  }

  updateSolution(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  }

  deleteSolution(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllSolutions(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/all`);
  }

  generateAllSolutions(): Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/generate`);
  }
}

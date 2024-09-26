import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080/api/solutions';

  constructor(private http: HttpClient) { }

  getAllSolutions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/all`);
  }

  getSolutionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addSolution(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, post);
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

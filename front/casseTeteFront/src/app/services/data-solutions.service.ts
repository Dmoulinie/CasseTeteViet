import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataSolutionsService {
  private dataSubject = new BehaviorSubject<any>(null); // You can specify a more specific type if needed
  data$ = this.dataSubject.asObservable();

  sendData(data: any[]) {
    this.dataSubject.next(data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementData } from '../models/element';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private readonly DATA_URL = 'assets/element-data.json';

  constructor(private http: HttpClient) { }

  getElements(): Observable<ElementData[]> {
    return this.http.get<ElementData[]>(this.DATA_URL);
  }
}

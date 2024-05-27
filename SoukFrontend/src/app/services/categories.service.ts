import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly productUrl = "http://localhost:8080/api/v1/categories"
  constructor(private http: HttpClient) { }

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.productUrl);
  }
}

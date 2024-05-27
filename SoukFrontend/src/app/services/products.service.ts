import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly productUrl = "http://localhost:8080/api/v1/products"
  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productUrl + '/' + id);
  }
  findbyCategory(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.productUrl, product);
  }

  deleteProduct(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }
  updateProduct(id: string | undefined, product: Product): Observable<void> {
    return this.http.put<void>(`${this.productUrl}/${id}`, product);
  }

}

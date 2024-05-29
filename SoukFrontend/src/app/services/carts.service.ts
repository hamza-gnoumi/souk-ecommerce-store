import { UserDto } from 'src/app/models/user-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  addToCart(product: Product) {
    throw new Error('Method not implemented.');
  }

  private readonly cartUrl = 'http://localhost:8080/api/v1/carts';

  constructor(private http: HttpClient) { }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartUrl);
  }

  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartUrl}/${id}`);
  }

  getCartByUserId(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartUrl}/user/${id}`);

  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.cartUrl, cart);
  }

  updateCart(id: string, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartUrl}/${id}`, cart);
  }

  deleteCart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`);
  }

  addProductToCart(cartId: string, product: Product, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartUrl}/${cartId}/products`, { productId: product.id, quantity });
  }

  removeProductFromCart(cartId: string, productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.cartUrl}/${cartId}/products/${productId}`);
  }





}

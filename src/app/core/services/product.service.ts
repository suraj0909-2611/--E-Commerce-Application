import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Inject HttpClient using Angular's inject function
  private http = inject(HttpClient);
  constructor() {}

  /**
   * Get all products from products.json
   * Returns Observable<Product[]>
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products.json');
  }
}
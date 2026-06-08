// Cart item model

import { Product } from './product.model';
export interface CartItem extends Product {
  // Quantity selected by user
  quantity: number;

}
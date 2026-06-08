import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  // Inject cart service
  cartService = inject(CartService);

  // Increase item quantity
  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  // Decrease item quantity
  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  // Remove item from cart
  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }
}

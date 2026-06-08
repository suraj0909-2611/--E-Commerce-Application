import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Cart storage key for localStorage
  private readonly storageKey = 'cart_items';

  // Cart items signal
  cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  // Grand total calculation using computed signal
  grandTotal = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  // Total cart item count
  cartCount = computed(() => {
    return this.cartItems().reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  });

  constructor() {
    // Save cart automatically whenever cartItems changes
    effect(() => {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.cartItems())
      );
    });
  }

// Add product to cart
addToCart(product: Product): void {
  this.cartItems.update(items => {
    // Check product already exists or not
    const existingItem = items.find(item => item.id === product.id);
    // If product exists, increase quantity
    if (existingItem) {
      return items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // If product does not exist, add as new item
    return [
      ...items,
      {
        ...product,
        quantity: 1
      }
    ];
  });
}

  // Increase product quantity
  increaseQuantity(productId: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease product quantity
  decreaseQuantity(productId: number): void {
    this.cartItems.update(items =>
      items
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  // Remove product from cart
  removeItem(productId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== productId)
    );
  }

  // Load cart from localStorage
  private loadCartFromStorage(): CartItem[] {
    const cartData = localStorage.getItem(this.storageKey);
    return cartData ? JSON.parse(cartData) : [];
  }
}
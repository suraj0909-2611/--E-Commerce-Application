import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.scss',
})
export class ProductDetailDialogComponent {
  product = inject<Product>(MAT_DIALOG_DATA);

  private dialogRef = inject(MatDialogRef<ProductDetailDialogComponent>);
  private cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

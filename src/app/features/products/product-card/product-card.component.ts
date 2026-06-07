import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input({ required: true }) product!: Product;

  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  openProductDetails(): void {
    this.dialog.open(ProductDetailDialogComponent, {
      data: this.product,
      width: '850px',
      height: '550px',
      maxWidth: '95vw',
      panelClass: 'product-dialog'
    });
  }
addToCart(): void {

  this.cartService.addToCart(this.product);

  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {

    this.snackBar.open(
      `${this.product.name} added to cart`,
      '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      }
    );

  }

}
}
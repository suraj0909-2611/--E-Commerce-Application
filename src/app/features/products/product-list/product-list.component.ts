import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    EmptyStateComponent,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  // Inject Product and cart Service
  private productService = inject(ProductService);
  cartService = inject(CartService);

  // Store products using Angular Signals
  products = signal<Product[]>([]);

  // Loading state
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Load products from JSON file
   */
  loadProducts(): void {
    this.isLoading.set(true);

    this.productService.getProducts().subscribe({
      next: (response) => {
        // Store API response
        this.products.set(response);

        // Hide loader
        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Error loading products', error);

        this.isLoading.set(false);
      },
    });
  }

  // Search text
  searchText = signal('');

  // Selected category
  selectedCategory = signal('');

  // Filter products based on search and category
  filteredProducts = computed(() => {
    return this.products().filter((product) => {
      const searchMatch = product.name
        .toLowerCase()
        .includes(this.searchText().toLowerCase());

      const categoryMatch =
        !this.selectedCategory() ||
        product.category === this.selectedCategory();

      return searchMatch && categoryMatch;
    });
  });

  // Get unique categories from products
  categories = computed(() => {
    return [...new Set(this.products().map((p) => p.category))];
  });

  // Category dropdown open/close
  isMenuOpen = signal(false);

  // Toggle category menu
  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  // Close menu
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  // Select category
  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.closeMenu();
  }

  // Select all categories
  selectAllCategories(): void {
    this.selectedCategory.set('');
    this.closeMenu();
  }

  // Close category dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.category-menu')) {
      this.isMenuOpen.set(false);
    }
  }
}

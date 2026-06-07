import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart-contact/cart/cart.component')
        .then(m => m.CartComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/cart-contact/contact/contact.component')
        .then(m => m.ContactComponent)
  },

  {
    path: '**',
    redirectTo: ''
  }

];
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  // Inject FormBuilder and Sankbar
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Contact reactive form
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    const isMobile = window.innerWidth <= 768;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();

      if (!isMobile) {
        this.snackBar.open('Please fill all required fields correctly', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }

      return;
    }

    console.log(this.contactForm.value);

    if (!isMobile) {
      this.snackBar.open('Message submitted successfully', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });
    }

    this.contactForm.reset();

    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 1500);
  }
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-quote-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quote-page.html',
  styleUrl: './quote-page.scss',
})
export class QuotePage {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  formState: FormState = 'idle';

  quoteForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    service: ['', [Validators.required, this.serviceSelectedValidator]],
    budget: ['', Validators.required],
    projectDetails: ['', [Validators.required, Validators.minLength(20)]],
  });

  private serviceSelectedValidator(control: AbstractControl) {
    return control.value && control.value !== 'Select a service'
      ? null
      : { serviceNotSelected: true };
  }

  get fullName() { return this.quoteForm.get('fullName')!; }
  get email() { return this.quoteForm.get('email')!; }
  get service() { return this.quoteForm.get('service')!; }
  get budget() { return this.quoteForm.get('budget')!; }
  get projectDetails() { return this.quoteForm.get('projectDetails')!; }
  get isSubmitting() { return this.formState === 'submitting'; }
  get isSuccess() { return this.formState === 'success'; }
  get isError() { return this.formState === 'error'; }

  errorFor(field: string): string | null {
    const control = this.quoteForm.get(field);
    if (!control || !(control.invalid && control.touched)) return null;

    const { errors } = control;
    if (errors?.['required']) return 'This field is required.';
    if (errors?.['serviceNotSelected']) return 'Please select a service.';
    if (errors?.['email']) return 'Please enter a valid email address.';
    if (errors?.['minlength']) {
      const min = errors['minlength'].requiredLength;
      return `Must be at least ${min} characters.`;
    }
    return 'Invalid value.';
  }

  submitForm(): void {
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched(); // Trigger all error messages
      return;
    }

    this.formState = 'submitting';

    // Replace '/api/quote' with your real endpoint
    this.http.post('/api/quote', this.quoteForm.value).subscribe({
      next: () => {
        this.formState = 'success';
        this.quoteForm.reset();
      },
      error: (err) => {
        console.error('Quote submission failed:', err);
        this.formState = 'error';
      },
    });
  }

  retryForm(): void {
    this.formState = 'idle';
  }

}

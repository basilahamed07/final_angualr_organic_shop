import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrl: './feedbackform.component.css'
})
export class FeedbackformComponent {

  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.http.post('http://localhost:8000/api/feedback/', this.feedbackForm.value)
        .pipe(
          catchError(error => {
            console.error('Error occurred:', error);
            // Handle error here
            alert('Failed to submit feedback. Please try again later.');
            return of(null); // Return a fallback observable
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Feedback submitted successfully!', response);
            alert('Feedback submitted successfully!');
            this.feedbackForm.reset();
          }
        });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form.');
    }
  }
}
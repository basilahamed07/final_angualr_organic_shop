import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generatecop',
  templateUrl: './generatecop.component.html',
  styleUrl: './generatecop.component.css'
})
export class GeneratecopComponent implements OnInit {
  discountForm!: any;
  access: string | null = sessionStorage.getItem("access");


 


  constructor(private apiservice:HttpClient,private routers:Router) {
    
  }

  ngOnInit(): void {
    this.access = sessionStorage.getItem("access");
    // Initialize the form with a discount control and validation
    this.discountForm = new FormGroup({
      discount: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[0-9]+$'), // Only numbers are allowed
        Validators.min(0), // Minimum value is 0
        Validators.max(100) // Maximum value is 100 (assuming percentage)
      ])
    });
  }


  onSubmit(form:any) {
    if (this.discountForm.invalid) {
      window.alert('Form is invalid');
      return;
    }
    else{
      const discountValue = this.discountForm.value.discount;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access}`,
      });

      const formData = new FormData();
      formData.append('discount	', form.value.discount);

      this.apiservice.post('http://localhost:8000/api/coupon/', formData, { headers }).subscribe(
        () => {
          console.log('Order placed successfully');
          alert('Order placed successfully!');
          this.routers.navigate(['copond']);
        },
        error => {
          console.error('Error placing order', error);
          alert('Error placing order. Please try again.');
        }
      );

    }

   
  }
}
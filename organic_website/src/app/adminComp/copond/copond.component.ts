import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Session } from 'inspector';

@Component({
  selector: 'app-copond',
  templateUrl: './copond.component.html',
  styleUrl: './copond.component.css'
})
export class CopondComponent implements OnInit {
  data: any[] = []; // Array to hold the product data
  access: string | null = sessionStorage.getItem("access");

  constructor(private apiservice: HttpClient, private route: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/coupon/', { headers })
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data
          console.log('Data fetched successfully', this.data);
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  
}
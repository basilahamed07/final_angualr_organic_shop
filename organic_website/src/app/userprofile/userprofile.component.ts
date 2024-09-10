import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  data:any; // Array to hold the product data
  access: string | null = sessionStorage.getItem("access");

  constructor(private apiservice: HttpClient, private route: Router) {}

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/users/get_user', { headers })
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data // Initialize filtered data
          console.log('Data fetched successfully', this.data);
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
      console.log(this.data)
  }


  
}

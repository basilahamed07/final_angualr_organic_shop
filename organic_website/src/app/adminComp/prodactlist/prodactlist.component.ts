import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Session } from 'inspector';


@Component({
  selector: 'app-prodactlist',
  templateUrl: './prodactlist.component.html',
  styleUrl: './prodactlist.component.css'
})
export class ProdactlistComponent implements OnInit {
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

    this.apiservice.get('http://localhost:8000/api/Product_Table/', { headers })
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

  deleteDataprodact(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    if (confirm('Are you sure you want to delete this product?')) {
      this.apiservice.delete(`http://localhost:8000/api/Product_Table/${id}`, { headers })
        .subscribe(
          () => {
            this.data = this.data.filter(item => item.id !== id); // Remove deleted item from array
            alert('Product deleted successfully!');
          },
          error => {
            console.error('Error deleting product', error);
            alert('Error deleting product. Please try again.');
          }
        );
    }
  }
}
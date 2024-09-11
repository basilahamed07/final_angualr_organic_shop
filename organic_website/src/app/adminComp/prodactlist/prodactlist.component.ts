import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prodactlist',
  templateUrl: './prodactlist.component.html',
  styleUrls: ['./prodactlist.component.css']
})
export class ProdactlistComponent implements OnInit {
  data: any[] = []; // Array to hold the product data
  filteredData: any[] = []; // Array to hold the filtered data
  searchTerm: string = ''; // Search term for filtering
  access: string | null = sessionStorage.getItem("access");
  currentPage: number = 1;
  pageSize: number = 10;

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  constructor(private apiservice: HttpClient, private route: Router) { }

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
          this.filteredData = this.data; // Initialize filtered data
          this.filterProducts(); // Re-filter the data to apply initial filters
          console.log('Data fetched successfully', this.data);
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(product => 
        product.P_Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to the first page when filtering
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
            this.filterProducts(); // Re-filter the data
            alert('Product deleted successfully!');
          },
          error => {
            console.error('Error deleting product', error);
            alert('Error deleting product. Please try again.');
          }
        );
    }
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

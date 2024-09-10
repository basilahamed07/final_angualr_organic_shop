import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prodactedit',
  templateUrl: './prodactedit.component.html',
  styleUrls: ['./prodactedit.component.css']
})
export class ProdacteditComponent implements OnInit {
  prodact: any = {
    P_Name: '',
    P_description: '',
    P_Price: '',
    P_Stock: '',
    P_Brand: '',
    P_Category_id: '',
    P_image: null
  };
  
  userForm: FormGroup;
  file: File | null = null;
  access: string | null = sessionStorage.getItem("access");
  prodactid: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    // Initialize form group
    this.userForm = new FormGroup({
      P_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]),
      P_description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{10,100}$')]),
      P_Price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]),
      P_Stock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      P_Brand: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,100}$')]),
      P_Category_id: new FormControl('', [Validators.required, Validators.pattern('^[1-4]{1}$')]),
      P_image: new FormControl('')
    });
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.prodactid = this.route.snapshot.paramMap.get("id");
    
    this.http.get(`http://localhost:8000/api/Product_Table/${this.prodactid}/`, { headers })
      .subscribe(
        (res: any) => {
          this.prodact = res;
          this.userForm.patchValue(this.prodact); // Set form values with product data
        },
        error => {
          console.error('Error fetching product data', error);
          alert('Error fetching product data. Please try again.');
        }
      );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  addData(): void {
    if (this.userForm.invalid) {
      console.log(this.userForm.invalid);
      return;
    }

    const formData = new FormData();
    for (const key of Object.keys(this.userForm.value)) {
      formData.append(key, this.userForm.get(key)?.value);
    }
    if (this.file) {
      formData.append('P_image', this.file, this.file.name);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.http.put(`http://localhost:8000/api/Product_Table/${this.prodactid}/`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(
        () => {
          // alert('Product updated successfully!');
          this.router.navigate(['/admindash']);
        },
        error => {
          console.error('Error updating product', error);
          alert('Error updating product. Please try again.');
        }
      );
  }
}

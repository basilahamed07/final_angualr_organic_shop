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
  prodact: any = {  // Declare the prodact property
    P_Name: '',
    P_description: '',
    P_Price: '',
    P_Stock: '',
    P_Brand: '',
    P_Category_id: '',
    P_image: null
  };
  userForm!:any;
  file: File | null = null;
  access: string | null = sessionStorage.getItem("access");
  prodactid:any
  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute, ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.prodactid = this.route.snapshot.paramMap.get("id");
    this.http.get(`http://localhost:8000/api/Product_Table/${this.prodactid}/`, { headers })
    .subscribe(
      (res:any) => {
        id: res.id,
        this.prodact.P_Name= res.P_Name,
        this.prodact.P_description= res.P_description,
        this.prodact.P_Price= res.P_Price,
        this.prodact.P_Stock= res.P_Stock,
        this.prodact.P_Category_id= res.P_Category_id,
        this.prodact.P_Brand= res.P_Brand,
        this.prodact.P_image= res.P_image
      },
      error => {
        console.error('Error adding product', error);
        alert('Error adding product. Please try again.');
      }
    );

    this.userForm = new FormGroup({
      P_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]),
      P_description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{10,100}$')]),
      P_Price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]),
      P_Stock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      P_Brand: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,100}$')]),
      P_Category_id: new FormControl('', [Validators.required, Validators.pattern('^[1-4]{1}$')]),
      P_image: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  addData(): void {
    if (this.userForm.invalid) {
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

    this.http.post('http://localhost:8000/api/Product_Table/', formData, { headers })
      .subscribe(
        () => {
          alert('Product added successfully!');
          this.router.navigate(['/product-list']);
        },
        error => {
          console.error('Error adding product', error);
          alert('Error adding product. Please try again.');
        }
      );
  }
}

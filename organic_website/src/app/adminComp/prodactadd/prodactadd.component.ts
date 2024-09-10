import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prodactadd',
  templateUrl: './prodactadd.component.html',
  styleUrls: ['./prodactadd.component.css']
})
export class ProdactaddComponent implements OnInit {
  
  userForm!: any;
  file: File | null = null;
  access: string | null = sessionStorage.getItem("access");

  constructor(private apiservice: HttpClient, private route: Router) {}

  ngOnInit() {
    this.access = sessionStorage.getItem("access");

    this.userForm = new FormGroup({
      P_Name: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      P_description: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{10,100}$")]),
      P_Price: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{2,4}$")]),
      P_Stock: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{2,4}$")]),
      P_Brand: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      P_Category_id: new FormControl("", [Validators.required, Validators.pattern("^[1-4]{1}$")]),
      P_image: new FormControl("", [Validators.required]),
    });
  }

  getData(form: any) {
    if (this.userForm.invalid) {
      window.alert("form is invalid");
      return;
    }

    

    if (!this.file) {
      window.alert("Please select an image file.");
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
    });

    const formData = new FormData();
    formData.append('P_Name', form.value.P_Name);
    formData.append('P_description', form.value.P_description);
    formData.append('P_Price', form.value.P_Price);
    formData.append('P_Stock', form.value.P_Stock);
    formData.append('P_Brand', form.value.P_Brand);
    formData.append('P_Category_id', form.value.P_Category_id);
    formData.append('P_image', this.file);
    console.log(formData)

    if (this.file) {
      formData.append('P_image', this.file, this.file.name);
    }
    this.apiservice.post('http://localhost:8000/api/Product_Table/', formData, { headers }).subscribe(
      () => {
        console.log('Order placed successfully');
        alert('Order placed successfully!');
      },
      error => {
        console.error('Error placing order', error);
        alert('Error placing order. Please try again.');
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}

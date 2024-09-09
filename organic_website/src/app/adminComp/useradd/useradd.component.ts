import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.css'
})
export class UseraddComponent {

  userForm:any;
  access: string | null = sessionStorage.getItem("access");
  constructor(private apiservice:HttpClient){}


  // for user validation

  ngOnInit(){
    this.access = sessionStorage.getItem("access");
    this.userForm = new FormGroup({
      // fname:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      first_name:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      last_name:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      city:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      state:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      password:new FormControl("",[Validators.required,Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")]),
      email:new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$")]),
      phone_number:new FormControl("",[Validators.required,Validators.pattern("^[0-9 ]{10}$")]),
      first_line:new FormControl("",[Validators.required,Validators.pattern("[a-z0-9 ]{3,20}$")]),
      pincode:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{6}$")]),
      // term:new FormControl("",Validators.requiredTrue),
    })
  }
  

  // Correctly type the passwordMatchValidator as ValidatorFn


  getData(form:any){
    
    if(this.userForm.invalid){
      window.alert("form is invalid");
    }

    else{
      const formData = new FormData();
    formData.append('first_name', form.value.first_name);
    formData.append('last_name', form.value.last_name);
    formData.append('email', form.value.email);
    formData.append('Category_Name', form.value.Category_Name);
    formData.append('password', form.value.password);
    formData.append('confirm_password', form.value.password);
    formData.append('phone_number', form.value.phone_number);
    formData.append('first_line', form.value.first_line);
    formData.append('city', form.value.city );
    formData.append('state', form.value.state);
    formData.append('pincode', form.value.pincode);


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
    });
    
    
    this.apiservice.post('http://localhost:8000/api/users/register', formData, { headers }).subscribe(
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


    

  }
}

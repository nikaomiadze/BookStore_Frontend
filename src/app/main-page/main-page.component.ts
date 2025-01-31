import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { Login } from '../model/Login';




@Component({
  selector: 'app-main-page',
  imports: [CardModule,CommonModule,InputNumberModule,FormsModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  value1: number = 0;
  productValues: { [key: string]: number } = {};
  products: any[] = [];
  popupVisible = false;
  popupTitle = '';
  popupType: 'login' | 'register' = 'login';
  user = new User(); 
  registerForm!: FormGroup;
  login: Login = new Login();
  LoginForm!: FormGroup;
  loggedin:boolean=false;

  constructor(private userService:UserService,private httpclien:HttpClient,private formbuilder: FormBuilder){}
  
  ngOnInit(): void {
    this.userService.GetBooks().subscribe(data => {
      console.log(data);
      this.products = data;
  
      this.products.forEach(product => {
        this.productValues[product.book_name] = 0;
      });
    });
    this.registerForm = this.formbuilder.group({
      user_name:['',Validators.required],
      password:['',Validators.required],
      email:['']
      
    });
    this.LoginForm = this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]    
    });
  }
   openPopup(type: 'login' | 'register'): void {
    this.popupVisible = true;
    this.popupType = type;  // Set the pop-up type
    this.popupTitle = type === 'login' ? 'შესვლა' : 'რეგისტრაცია';  // Set title
  }

  closePopup(): void {
    this.popupVisible = false;
  }
  AddUser(): void {
    if (this.registerForm.valid) { 
     Object.assign(this.user, this.registerForm.value)
      
      console.log(this.user);
      this.userService.AddUser(this.user).subscribe({
        next: res => {
          alert("Registration successful");
          this.openPopup('login');
    },
   error: err => {
        console.error('Error during registration:', err);
        alert("Error during registration");
      },
      complete: () => {
        console.log("User registration process completed");
      }});
    } else {
      alert("Please fill out the form correctly");
    }
  }
  
authenticate(): void{
  Object.assign(this.login, this.LoginForm.value)

  this.userService.authenticate(this.login).subscribe(res=>{
    console.log(res.accessToken);
    localStorage.setItem("Token",res.accessToken);
    this.loggedin=true;
  })
}
  
  

}

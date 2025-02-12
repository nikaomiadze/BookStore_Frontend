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
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../model/Cart';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-main-page',
  imports: [CardModule,CommonModule,InputNumberModule,FormsModule,ButtonModule,ReactiveFormsModule,RouterModule],
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
  cart_product: number=0;



  constructor(private userService:UserService,private httpclien:HttpClient,private formbuilder: FormBuilder, private router:Router,private authService: AuthService,
  ){}
  
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
    this.loggedin = !!localStorage.getItem('Token');
    if(this.loggedin){
      this.get_cart_quantity();

    }

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
    const token = res.accessToken;
    this.authService.login(token);    
    
    this.closePopup();
    this.get_cart_quantity();
    this.router.navigate(['/login=true']);
    this.loggedin=true;
    
  })
}
addToCart(product: any) {
  if (!this.loggedin) {
    alert("გთხოვთ, გაიარეთ ავტორიზაცია კალათაში დასამატებლად!");
    return;
  }
  const userId = this.authService.currentUser?.UserID; 
  if (!userId) {
    console.error("User ID not available");
    return;
  } 
  const newCartItem = new Cart(
    undefined,
    userId,                   
    product.id,                   
    this.productValues[product.book_name]
  );
  this.userService.AddToCart(newCartItem).subscribe(res=>{
    console.log(res);
  })
  this.get_cart_quantity(); 
  this.go_in_cart();
}
get_cart_quantity(){
  const userId = this.authService.userId; 

this.userService.GetCart(userId!).subscribe(res=>{
  console.log(res);
  this.cart_product=res.length;
});
}
go_in_cart(){
  const userId = this.authService.currentUser?.UserID; 
  this.userService.GetCart(userId);
  this.router.navigate(["/cart"])
}
log_out(){
  localStorage.removeItem('Token');
  this.loggedin=false;
  this.router.navigate(["/"]);
}
}



import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-main-page',
  imports: [CardModule,CommonModule,InputNumberModule,FormsModule,ButtonModule],
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
  constructor(private userService:UserService,private httpclien:HttpClient){}
  
  ngOnInit(): void {
    this.userService.GetBooks().subscribe(data => {
      console.log(data);
      this.products = data;
  
      this.products.forEach(product => {
        this.productValues[product.book_name] = 0;
      });
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
  

}

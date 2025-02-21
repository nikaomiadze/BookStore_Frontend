import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { UserCart } from '../model/UserCart';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';






interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-cart-page',
  imports: [TableModule,CommonModule,ButtonModule,InputNumberModule,FormsModule,RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cols!: Column[];
  products: any[] = [];
  userId: number | null = null;
  amount:number|null=0;
  loading: boolean = false;


  constructor(private userservice:UserService,private authservice:AuthService,private router:Router) {}

  ngOnInit() {
    this.get_cart_item();
      this.cols = [
          { field: 'book_name', header: 'დასახელება' },
          { field: 'quantity', header: 'რაოდენობა' },
          { field: 'author', header: 'ავტორი' },
          { field: 'order_price', header: 'ფასი' }

      ];
  }
  delete_cart_item(id: number) {
    this.loading = true; 
  
    this.userservice.DeleteCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.amount = 0;
        this.loading = false;
        this.get_cart_item();
      },
      error: (error) => {
        console.error('Error deleting item:', error);
        this.loading = false;
      },
    });
}
  
  get_cart_item() {
    this.loading = true;
    this.userId = this.authservice.userId;
  
    this.userservice.GetCart(this.userId!).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.products = data;
          this.amount = this.products.reduce((sum, item) => sum + item.order_price, 0);  
          this.loading = false; 
        }, 600);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
        this.loading = false;
      },
    });
  }
  Add_Order(id:number){
    this.userservice.AddOrder(id).subscribe(res=>{
      alert(res);
      this.get_cart_item();
    })
  }
}

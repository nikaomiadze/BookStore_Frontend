import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { UserCart } from '../model/UserCart';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms'; 





interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-cart-page',
  imports: [TableModule,CommonModule,ButtonModule,InputNumberModule,FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cols!: Column[];
  products: any[] = [];
  userId: number | null = null;
  amount:number|null=0;


  constructor(private userservice:UserService,private authservice:AuthService) {}

  ngOnInit() {
    this.get_cart_item();
      this.cols = [
          { field: 'book_name', header: 'დასახელება' },
          { field: 'quantity', header: 'რაოდენობა' },
          { field: 'author', header: 'ავტორი' },
          { field: 'order_price', header: 'ფასი' }

      ];
  }
  delete_cart_item(id:number){
    this.userservice.DeleteCartItem(id).subscribe((res)=>{
      console.log(res);
      this.amount=0;
      this.get_cart_item();
    })
  }
  get_cart_item(){
    this.userId=this.authservice.userId;
    console.log(this.userId);
    this.userservice.GetCart(this.userId!).subscribe((data) => {
        this.products = data;
        let i=0;
        for (let i = 0; i < this.products.length; i++) {
          this.amount += this.products[i].order_price;
      }
    });
  }

}

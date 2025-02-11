import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { UserCart } from '../model/UserCart';
import { CommonModule } from '@angular/common';


interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-cart-page',
  imports: [TableModule,CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cols!: Column[];
  products: any[] = [];
  userId: number | null = null;


  constructor(private userservice:UserService,private authservice:AuthService) {}

  ngOnInit() {
      this.userId=this.authservice.userId;
      console.log(this.userId);
      this.userservice.GetCart(this.userId!).subscribe((data) => {
          this.products = data;
      });

      this.cols = [
          { field: 'book_name', header: 'დასახელება' },
          { field: 'quantity', header: 'რაოდენობა' },
          { field: 'author', header: 'ავტორი' },
          { field: 'order_price', header: 'ფასი' }

      ];
  }

}

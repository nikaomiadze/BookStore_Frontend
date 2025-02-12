import { Injectable } from '@angular/core';
import { Book } from './model/Book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './model/User';
import { Login } from './model/Login';
import { LoginedUser } from './model/LoginedUser';
import { UserCart } from './model/UserCart';
import { Cart } from './model/Cart';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private books: Book[]=[];
  private user: LoginedUser[]=[];

  constructor(private http:HttpClient) { }
  AddUser(user:User):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' 
    };
    console.log(user);
    return this.http.post<any>("https://localhost:7175/add_user" ,user,httpOptions);
  }
   authenticate(login:Login):Observable<any>{
      let httpOptions={
        headers:new HttpHeaders({'Content-Type':'application/json'})
      };
      return this.http.post<any>("https://localhost:7175/login_user", login, httpOptions)
    .pipe(
      catchError(error=>{
        alert(error.error);
        return throwError(()=>new Error(''));
      })
    )    
    }


  GetBooks():Observable <Book[]>{ 
    return  this.http.get<Book[]>("https://localhost:7175/Get_books")
  }
  get booklist():Book[]{
    return this.books;
  }
  set booklist(list :Book[]){
    this.books=list;
  }
  GetUser(id:number):Observable<LoginedUser[]>{
    return this.http.get<LoginedUser[]>(`https://localhost:7175/get_user_by_id?id=${id}`)
  }
  get logineduser():LoginedUser[]{
    return this.user;
  }
  set logineduser(list :LoginedUser[]){
    this.user=list;
  }
  GetCart(id:number):Observable<UserCart[]>{
    return this.http.get<UserCart[]>(`https://localhost:7175/Get_user_cart?id=${id}`)
  }
  AddToCart(cart:Cart):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' 
    };
    return this.http.post<any>("https://localhost:7175/add_in_cart" ,cart,httpOptions);

  }
  DeleteCartItem(id:number):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' 
    };
    return this.http.delete<any>(`https://localhost:7175/Delete_cart_item?id=${id}`,httpOptions);
  }
  

  
}


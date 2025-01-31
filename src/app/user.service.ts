import { Injectable } from '@angular/core';
import { Book } from './model/Book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private books: Book[]=[];

  constructor(private http:HttpClient) { }

  GetBooks():Observable <Book[]>{ 
    return  this.http.get<Book[]>("https://localhost:7175/Get_books")
  }
  get booklist():Book[]{
    return this.books;
  }
  set booklist(list :Book[]){
    this.books=list;
  }
  
}


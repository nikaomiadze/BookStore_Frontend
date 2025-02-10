import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public userservice:UserService){}
  public currentUser: any = null;
  public loginedUser: any = null;


  // Call this method after successful authentication
  login(token: string): void {
    localStorage.setItem('Token', token);
    // Decode the token once and store the result
    this.currentUser = jwt_decode.jwtDecode(token);
    const userid=this.currentUser?.UserID;
    this.userservice.GetUser(userid).subscribe(res=>{
        this.loginedUser=res[0];
        console.log(this.loginedUser.id);
    })
    console.log(this.currentUser);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('Token');
  }

  logout(): void {
    localStorage.removeItem('Token');
    this.currentUser = null;
  }
}




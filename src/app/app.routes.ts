import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const routes: Routes = [
    {path:"",component:MainPageComponent},
    {path:"login=true",component:MainPageComponent},
    {path:"cart",component:CartPageComponent}

];

import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: 'login=true',
    loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart-page/cart-page.component').then(m => m.CartPageComponent)
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

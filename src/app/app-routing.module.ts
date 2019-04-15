import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'addrestaurant',
    loadChildren: './addrestaurant/addrestaurant.module#AddrestaurantPageModule'
  },
  { 
    path: 'restaurantdetails/:id',
    loadChildren: './restaurantdetails/restaurantdetails.module#RestaurantdetailsPageModule'
  },
  { 
    path: 'editrestaurant/:id',
    loadChildren: './editrestaurant/editrestaurant.module#EditrestaurantPageModule'
  },
  { 
    path: 'raterestaurant/:id',
    loadChildren: './raterestaurant/raterestaurant.module#RaterestaurantPageModule'
  },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

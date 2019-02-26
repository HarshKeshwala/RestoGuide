import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantdetailsPage } from './restaurantdetails.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantdetailsPage]
})
export class RestaurantdetailsPageModule {}

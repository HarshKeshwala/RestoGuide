import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantdetailsPage]
})
export class RestaurantdetailsPageModule {}

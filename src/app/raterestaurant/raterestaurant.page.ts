import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';

import { LoadingController, AlertController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-raterestaurant',
  templateUrl: './raterestaurant.page.html',
  styleUrls: ['./raterestaurant.page.scss'],
})
export class RaterestaurantPage implements OnInit {

  public rateRestoForm: FormGroup; 

  public restaurant: Observable<any>;
  public resId;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private navCtrl: NavController,
    formBuilder: FormBuilder
  ) {
    this.rateRestoForm = formBuilder.group({
      resRating: ['', Validators.required],
    });
  }

  async rateRestaurant() {
    const loading = await this.loadingCtrl.create();
    const resRating = this.rateRestoForm.value.resRating;
  
    this.firestoreService.updateRatingsRestaurant(this.resId,resRating).then(() => {
        loading.dismiss().then(() => {
          this.navCtrl.navigateRoot('/restaurantdetails/'+this.resId);
        });
      },
      error => {
        console.error(error);
      }
    );
    return await loading.present();
  }

  ngOnInit() {
    this.resId = this.route.snapshot.paramMap.get('id');
    this.restaurant = this.firestoreService.getRestaurantDetail(this.resId).valueChanges();
  }

}

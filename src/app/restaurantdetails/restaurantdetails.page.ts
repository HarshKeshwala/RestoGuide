import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.page.html',
  styleUrls: ['./restaurantdetails.page.scss'],
})
export class RestaurantdetailsPage implements OnInit {

  public restaurant: Observable<any>;
  public resId;

  constructor(
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.resId = this.route.snapshot.paramMap.get('id');
    this.restaurant = this.firestoreService.getRestaurantDetail(this.resId).valueChanges();
  }

  async deleteRestaurant() {

    const alert = await this.alertCtrl.create({
      message: 'Delete this restaurant?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            this.firestoreService.deleteRestaurant(this.resId).then(() => {
              this.navCtrl.navigateRoot('/list')
            });
          },
        },
      ],
    });
    await alert.present();
        // this.firestoreService.deleteRestaurant(this.resId).then(() => {
        //   console.log("delete id"+this.resId)
        //   this.navCtrl.navigateRoot('/list')
        // })
  }
}

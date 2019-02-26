import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';

import { LoadingController, AlertController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editrestaurant',
  templateUrl: './editrestaurant.page.html',
  styleUrls: ['./editrestaurant.page.scss'],
})
export class EditrestaurantPage implements OnInit {

  public editRestoForm: FormGroup; 

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
      this.editRestoForm = formBuilder.group({
        resNewName: ['', Validators.required],
        resNewAddress: ['', Validators.required],
        resNewPhone: ['', Validators.required],
        resNewDescription: ['', Validators.required],
        resNewTags: ['', Validators.required]
      });
    }

    async updateRestaurant() {
      const loading = await this.loadingCtrl.create();
      const resName = this.editRestoForm.value.resNewName;
      const resAddress = this.editRestoForm.value.resNewAddress;
      const resPhone = this.editRestoForm.value.resNewPhone;
      const resDescription = this.editRestoForm.value.resNewDescription;
      const resTags = this.editRestoForm.value.resNewTags;
  
      this.firestoreService.updateRestaurant(this.resId,resName, resAddress, resPhone, resDescription, resTags).then(() => {
          loading.dismiss().then(() => {
            this.navCtrl.navigateRoot('/list')
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

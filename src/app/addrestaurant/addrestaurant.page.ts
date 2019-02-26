import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';

import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
//ort { HomePage} from '../home/home.page'
@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.page.html',
  styleUrls: ['./addrestaurant.page.scss'],
})
export class AddrestaurantPage implements OnInit {

  public addRestoForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder
  ) {
    this.addRestoForm = formBuilder.group({
      resName: ['', Validators.required],
      resAddress: ['', Validators.required],
      resPhone: ['', Validators.required],
      resDescription: ['', Validators.required],
      resTags: ['', Validators.required]
    });
  }

  async addRestaurant() {
    const loading = await this.loadingCtrl.create();
    const resName = this.addRestoForm.value.resName;
    const resAddress = this.addRestoForm.value.resAddress;
    const resPhone = this.addRestoForm.value.resPhone;
    const resDescription = this.addRestoForm.value.resDescription;
    const resTags = this.addRestoForm.value.resTags;

    this.firestoreService.addRestaurant(resName, resAddress, resPhone, resDescription, resTags).then(() => {
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
  }

}

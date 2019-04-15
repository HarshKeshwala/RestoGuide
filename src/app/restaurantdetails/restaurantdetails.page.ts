import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.page.html',
  styleUrls: ['./restaurantdetails.page.scss'],
})
export class RestaurantdetailsPage implements OnInit {

  public restaurant: Observable<any>;
  public resId;
  text = 'Check out the Ionic Academy!';
  url = 'https://ionicacademy.com';
  constructor(
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private socialSharing: SocialSharing,
    private file: File
  ) { }

  ngOnInit() {
    this.resId = this.route.snapshot.paramMap.get('id');
    this.restaurant = this.firestoreService.getRestaurantDetail(this.resId).valueChanges();
  }
  async resolveLocalFile() {
    return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'academy.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
  }
 
  removeTempFile(name) {
    this.file.removeFile(this.file.cacheDirectory, name);
  }
  async shareEmail() {
    let file = await this.resolveLocalFile();
 
    this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['saimon@devdactic.com'], null, null, file.nativeURL).then(() => {
      this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }

  async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  // edit() {
  //   this.navCtrl.navigateRoot('/editrestaurant/'+this.resId)
  //   console.log("/editrestaurant/"+this.resId)
  // }
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

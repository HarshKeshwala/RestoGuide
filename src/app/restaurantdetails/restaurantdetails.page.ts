import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';

import { NavController, IonCardContent, IonCard, IonItem, IonCardHeader } from '@ionic/angular';
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
  public rName;
  public rAddress;
  public rTags;

  rdetails = [];

  text = 'Checkout new restaurant!';
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

    this.restaurant.forEach(element => {
        this.rdetails.push(element.resName)
        this.rdetails.push(element.resAddress)
        this.rdetails.push(element.resTags)
    });

    // this.firestoreService.getRestaurantDetail(this.resId).valueChanges().subscribe((Led: any) => {
    //   this.rName = Led[3].rName;
    //   console.log("**************"+this.rName)
    // });
  }


  async resolveLocalFile() {
    return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'academy.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg`);
  }
 
  removeTempFile(name) {
    this.file.removeFile(this.file.cacheDirectory, name);
  }

  async shareEmail() {
   // this.rName = this.rdetails[0];
   this.rName = this.rdetails[0];
    this.rAddress = this.rdetails[1];
    this.rTags = this.rdetails[2];
    let file = await this.resolveLocalFile();
    this.socialSharing.shareViaEmail(this.text+"\n Restaurant Name: "+this.rName+"\n Address: "+this.rAddress+"\n Tags: "+this.rTags, 'RestoGuide Email!', ['hkeshwal@my.centennialcollege.ca'], null, null, null).then(() => {
      this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }

  facebookShare(){
    //alert("dd"+this.rdetails[1])
    //this.rName = this.rdetails[0];
    this.rName = this.rdetails[0];
    this.rAddress = this.rdetails[1];
    this.rTags = this.rdetails[2];
    this.socialSharing.shareViaFacebook("RestoGuide via Facebook","Restaurant Name: "+this.rName /*Image*/,"Restaurant Name: "+this.rName)
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed"+this.rName+""+this.rAddress)
      })
  }
  twitterShare(){
   // this.rName = this.rdetails[0];
   this.rName = this.rdetails[0];
    this.rAddress = this.rdetails[1];
    this.rTags = this.rdetails[2];
    this.socialSharing.shareViaTwitter("RestoGuide via Twitter\n Restaurant Name: "+this.rName+"\n Address: "+this.rAddress+"\n Tags: "+this.rTags,null /*Image*/,"this")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
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

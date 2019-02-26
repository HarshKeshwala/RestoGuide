import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.page.html',
  styleUrls: ['./restaurantdetails.page.scss'],
})
export class RestaurantdetailsPage implements OnInit {

  public restaurant: Observable<any>;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const resId: string = this.route.snapshot.paramMap.get('id');
    this.restaurant = this.firestoreService.getRestaurantDetail(resId).valueChanges();
  }

}

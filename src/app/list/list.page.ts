import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';

import { Router, RouterModule } from '@angular/router';

import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public resList; 
  column: string = 'name';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
  ) {}
 
 
  ngOnInit() {
    this.resList = this.firestoreService.getRestaurants().valueChanges();
  }
  
  getItems(ev) {
    // Reset items back to all of the items
    this.resList();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.resList = this.resList.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}

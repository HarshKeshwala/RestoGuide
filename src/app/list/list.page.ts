import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/hotels.interface';
import { FirestoreService } from '../services/data/firestore.service';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public resList; 

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.resList = this.firestoreService.getRestaurants().valueChanges();
  }

}

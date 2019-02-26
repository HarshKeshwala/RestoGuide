import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Restaurant } from '../../models/hotels.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  addRestaurant(
    resName: string,
    resAddress: string,
    resPhone: String,
    resDescription: string,
    resTags: string
  ): Promise<void> { 
    const id = this.firestore.createId();

    return this.firestore.doc('resList/${{id}}').set({
      id,
      resName,
      resAddress,
      resPhone,
      resDescription,
      resTags
    });
  }

  getRestaurants() {
    return this.firestore.collection('resList');
  }
}

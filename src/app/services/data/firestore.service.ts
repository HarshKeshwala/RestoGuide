import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Restaurant } from '../../models/hotels.interface';
import { debug } from 'util';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  addRestaurant(name: string,address: string,phone: String,description: string,tags: string, ratings: string):Promise<void> { 
    const id = this.firestore.createId();
    console.log("your id "+id);
    return this.firestore.doc('resList/'+id).set({
      resId: id,
      resName: name,
      resAddress: address,
      resPhone: phone,
      resDescription: description,
      resTags: tags,
      resRatings: ratings
    });
  }

  getRestaurants() {
    return this.firestore.collection('resList');
  }

  getRestaurantDetail(resId: string) {
    //console.log("Detail id"+resId);
    return this.firestore.collection('resList').doc(resId);
  }

  deleteRestaurant(resId: string): Promise<void> {
    //console.log("delete id in service ${{resId}}")
    return this.firestore.doc('resList/'+resId).delete();
  }

  updateRestaurant(id: string, name: string,address: string,phone: String,description: string,tags: string):Promise<void> {
    return this.firestore.doc('resList/'+id).update({
      resName: name,
      resAddress: address,
      resPhone: phone,
      resDescription: description,
      resTags: tags
    });
  }

  updateRatingsRestaurant(id: string, rating: string):Promise<void> {
    return this.firestore.doc('resList/'+id).update({
      resRatings: rating,
  });
  }
}

import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';


declare var google: any;
// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  @ViewChild('Map') mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = {lat: null, lng: null};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  apiKey: any = 'AIzaSyC4zkV3Nrc3wiMPuBoSuacpAI3eO8qSxYo'; 

  constructor(public zone: NgZone, public geolocation: Geolocation) {
    /*load google map script dynamically */
    const script = document.createElement('script');
    script.id = 'googleMap';
    if (this.apiKey) {
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
     }// else {
    //     script.src = 'https://maps.googleapis.com/maps/api/js?key=';
    // }
    document.head.appendChild(script);
    /*Get Current location*/

    this.geolocation.getCurrentPosition().then((position) =>  {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
    });

    /*Map options*/
    this.mapOptions = {
        center: this.location,
        zoom: 21,
        mapTypeControl: false
    };
    setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        /*Marker Options*/
        this.markerOptions.position = this.location;
        this.markerOptions.map = this.map;
        this.markerOptions.title = 'My Location';
        this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);
   }

  //  getDirections() {
  //   var start = this.location;
  //   var end = new google.maps.LatLng(43.009953, -81.273613);

  //   var request = {
  //       origin: start,
  //       destination: end,
  //       travelMode: google.maps.TravelMode.DRIVING
  //   };

  //   directionsService.route(request, function(response, status) {
  //       if(status == google.maps.DirectionsStatus.OK) {
  //           this.directionsDisplay.setDirections(response);
  //       }
  //   });
  // }

}

import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png"
});

export type LocationTypes = "Business"|"Friend"|"Home"|"Favorite";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  popupVisible = true;
  popupMode :'edit'|'new' = 'new';
  loading: boolean = false;

  locationTypes : LocationTypes[] = ['Business', 'Friend', 'Home', 'Favorite'];
  defaultLocation: L.LatLngExpression = [11.206051, 122.447886]; 
  popupMap!: L.Map;
  mapLoading: boolean = false;


  location = {
    name: '',
    type:'Business',
    latlng: this.defaultLocation,
    logo: ''
  }

  locationForm = new FormGroup({
    name: new FormControl(this.location.name, [Validators.required, Validators.minLength(4)]),
    type: new FormControl(this.location.type, [Validators.required]),
    latlng: new FormControl(this.location.latlng, [Validators.required]),
    logo: new FormControl(this.location.logo)
  });

  get locationName(){
    return this.locationForm.get('name');
  }get locationType(){
    return this.locationForm.get('type');
  }get locationLatlng(){
    return this.locationForm.get('latlng');
  }get locationLogo(){
    return this.locationForm.get('logo');
  }





  ngAfterViewInit(){
    this.popupMap = L.map('popup-map').setView(this.defaultLocation, 15);
    const tile_layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(this.popupMap);
    tile_layer.on("load",() =>  this.mapLoading = false);
    tile_layer.on("loading",() => this.mapLoading = true );
  }

  onSubmit(){
    console.log('jo')
    this.locationForm.markAllAsTouched();
    if (this.locationForm.valid) {
      //saveit
    } 
  }

  onPopupClose(){
    this.popupVisible = false;
  }

  onMapClick(e:any){
    console.log(e.latlng);
    this.popupVisible = true;
    this.location.latlng = [e.latlng?.lat, e.latlng.lng];
      this.popupMap.setView(this.location.latlng, 12)
      L.marker(this.location.latlng).addTo(this.popupMap);
  }

}

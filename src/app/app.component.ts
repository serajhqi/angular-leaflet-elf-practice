import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { LocationRepository, LocationTypes, Location } from './services/state.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NotificationService, private locationsRepo: LocationRepository) { }

  ngOnInit(): void {
    // this.savedLocations = this.storgeService.getLocations();
  }

  popupVisible = false;
  popupMode: 'edit' | 'new' = 'new';
  loading: boolean = false;

  locationTypes: LocationTypes[] = ['Business', 'Friend', 'Home', 'Favorite'];
  defaultLocation: L.LatLngExpression = [51.5, -.9];
  savedLocations: Location[] = [];
  mapLoading: boolean = false;
  focusedMarkerId?: string;

  location: Location = {
    id:'',
    name: '',
    type: 'Business',
    latlng: this.defaultLocation,
    logo: ''
  }

  locationForm = new FormGroup({
    name: new FormControl(this.location.name, [Validators.required, Validators.minLength(4)]),
    type: new FormControl(this.location.type, [Validators.required]),
    latlng: new FormControl(this.location.latlng, [Validators.required]),
    logo: new FormControl(this.location.logo)
  });

  get locationName() {
    return this.locationForm.get('name');
  } get locationType() {
    return this.locationForm.get('type');
  } get locationLatlng() {
    return this.locationForm.get('latlng');
  } get locationLogo() {
    return this.locationForm.get('logo');
  }

  onSubmit() {
    this.locationForm.markAllAsTouched();
    if (this.locationForm.valid) {
      this.locationsRepo.addLocation(this.locationForm.value as Location);
      this.popupVisible = false;
      this.notificationService.notify({title:'Location Saved', content:'',toastType:'success'});
      this.locationForm.reset(this.location);
    }
  }

  onPopupClose() {
    this.popupVisible = false;
    this.locationForm.reset(this.location);
  }

  onMapClick(e: any) {
    this.popupMode = 'new';
    this.popupVisible = true;
    this.location.latlng = [e.latlng?.lat, e.latlng.lng];
    this.locationForm.setValue({ ...this.location, latlng: [e.latlng?.lat, e.latlng.lng] })
  }

  openEditModal(id:string){
    const location = this.locationsRepo.getLocation(id);
    if(!location){
      this.notificationService.notify({title:'Not found',content:'',toastType:'error'});
      return;
    }else{
      this.locationForm.setValue({
        name: location.name,
        type: location.type,
        latlng: location.latlng,
        logo: location.logo
      });
      this.popupMode = 'edit';
      this.popupVisible = true;
    }
  }
  
  updateLocation(){
    if(!this.focusedMarkerId || !this.locationForm.valid) return;
    
    this.locationsRepo.updateLocation(this.locationForm.value as Location);
    this.notificationService.notify({title:'Location updated', content:'',   toastType:'success'});
    this.locationForm.reset(this.location);
    this.popupVisible = false;
  }

  onMarkerPopupOpen(id: string){
    this.focusedMarkerId = id;
  } 
  onMarkerPopupClose(){
    this.focusedMarkerId = undefined;
  }
}

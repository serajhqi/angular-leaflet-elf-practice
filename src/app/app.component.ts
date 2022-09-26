import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';

export type LocationTypes = "Business" | "Friend" | "Home" | "Favorite";
export type Location = {
  id?: string,
  name: string,
  type: LocationTypes,
  latlng: L.LatLngExpression,
  logo: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private storgeService: StorageService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.savedLocations = this.storgeService.getLocations();
  }

  popupVisible = false;
  popupMode: 'edit' | 'new' = 'new';
  loading: boolean = false;

  locationTypes: LocationTypes[] = ['Business', 'Friend', 'Home', 'Favorite'];
  defaultLocation: L.LatLngExpression = [51.5, -.9];
  savedLocations: Location[] = [];
  mapLoading: boolean = false;

  location: Location = {
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
      this.storgeService.saveLocation(this.locationForm.value as Location);
      this.savedLocations = this.storgeService.getLocations();
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
    this.popupVisible = true;
    this.location.latlng = [e.latlng?.lat, e.latlng.lng];
    this.locationForm.setValue({ ...this.location, latlng: [e.latlng?.lat, e.latlng.lng] })
  }

  onMarkerPopupOpen(e: any){
    console.log(e,'ppo')
  }
}

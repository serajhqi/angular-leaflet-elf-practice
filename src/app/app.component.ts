import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'location-spots';
  popupVisible = true;
  popupMode :'edit'|'new' = 'edit';
  loading: boolean = false;

  onPopupClose(){
    this.popupVisible = false;
  }

  onMapClick(e:any){
    console.log(e.latlng);
    this.popupVisible = true;
  }

  saveLocation(){
    this.popupVisible = false;
  }
}

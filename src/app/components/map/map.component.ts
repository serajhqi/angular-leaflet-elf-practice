import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from "leaflet";
import { Observable, map } from 'rxjs';
import { Location } from 'src/app/app.component';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png"
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  @Input() defaultLocation: L.LatLngExpression = [11.206051, 122.447886];
  @Input() defaultZoomLevel: number = 9;
  @Input() savedLocations: Location[] = [];

  @Output() onMapClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.defaultLocation, this.defaultZoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // L.marker(this.defaultLocation).addTo(this.map)
    //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
      
    // L.marker([11.206051, 122.57886]).addTo(this.map)
    //   .bindPopup('A pretty CSS3 popup.<br> Easily seraj. <p class="salam">Salam</p>')
      
    this.savedLocations.forEach((location)=>{
      L.marker(location.latlng).addTo(this.map)
      .bindPopup(location.name)
    })
 
    this.map.on('click',(e)=>{
      this.onMapClick.emit(e)
    })
    
  }

}

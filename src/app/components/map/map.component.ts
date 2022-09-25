import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from "leaflet";
import { Observable, map } from 'rxjs';

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
  @Input() defaultLocation: L.LatLngExpression = [11.206051, 122.447886]
  @Input() defaultZoomLevel: number = 10
  @Input() locationSpots: [string, number, number][] = [
    ["LOCATION_1", 11.8166, 122.0942],
    ["LOCATION_2", 11.9804, 121.9189],
    ["LOCATION_3", 10.7202, 122.5621],
    ["LOCATION_4", 11.3889, 122.6277],
    ["LOCATION_5", 10.5929, 122.6325]
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.defaultLocation, this.defaultZoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    L.marker(this.defaultLocation).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
      
    L.marker([11.206051, 122.57886]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily seraj. <p class="salam">Salam</p>')
      
    this.locationSpots.forEach((item)=>{
      L.marker([item[1],item[2]]).addTo(this.map)
      .bindPopup(item[0])
    })
 

    
  }

}

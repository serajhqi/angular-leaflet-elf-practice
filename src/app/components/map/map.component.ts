import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from "leaflet";
import type {Location} from "../../app.component"
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

    this.savedLocations.forEach((location:Location)=>{
      L.marker(location.latlng).addTo(this.map)
      .bindPopup(`<b>${location.name}</b><br>
        <b>type: </b> ${location.type}
        <b>logo: </b> ${location.logo} ${JSON.stringify(location)}
      `)
    })
 
    this.map.on('click',(e)=>{
      this.onMapClick.emit(e)
    })
    
  }

}

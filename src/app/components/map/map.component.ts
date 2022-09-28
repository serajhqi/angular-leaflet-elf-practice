import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import { LocationRepository } from 'src/app/services/state.service';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png",
  iconAnchor:   [12, 40],
  popupAnchor:  [0, -40]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  @Input() defaultLocation!: L.LatLngExpression;
  @Input() defaultZoomLevel: number = 9;
  @Output() onMapClick: EventEmitter<any> = new EventEmitter();

  constructor(private locationsRepo: LocationRepository) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.defaultLocation, this.defaultZoomLevel);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
 
    this.map.on('click',(e)=>{
      this.onMapClick.emit(e)
    })
    
    this.locationsRepo.locations$.subscribe((locs)=>{
      locs.forEach((location)=>{
        this.map && L.marker((location).latlng).addTo(this.map)
        .bindPopup(`
          <b>Title: </b> ${(location).name}<br>
          <b>Type: </b> ${(location).type}<br>
          <b>Lat,Lng: </b> ${(location).latlng}<br>
          <b>Logo: </b> ${(location).logo}<br>
        `).on('popupopen',()=>{
          this.locationsRepo.setTargetForEdit(location.id);
        }).on('popupclose',()=>{
          this.locationsRepo.clearTargetForEdit();
        })
      })
    })
  }

}
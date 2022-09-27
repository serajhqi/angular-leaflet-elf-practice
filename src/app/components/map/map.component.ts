import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import type {Location} from "../../app.component";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png"
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  private map!: L.Map;
  @Input() defaultLocation!: L.LatLngExpression;
  @Input() defaultZoomLevel: number = 9;
  @Input() savedLocations!: Location[];
  @Output() onMapClick: EventEmitter<any> = new EventEmitter();
  @Output() onPopupOpen: EventEmitter<any> = new EventEmitter();
  @Output() onPopupClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dropMarkers()
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.defaultLocation, this.defaultZoomLevel);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.dropMarkers();
 
    this.map.on('click',(e)=>{
      this.onMapClick.emit(e)
    })
    
  }

  dropMarkers(): void{
    this.savedLocations.forEach((location)=>{
      this.map && L.marker((location as Location).latlng).addTo(this.map)
      .bindPopup(`
        <b>Title: </b> ${(location as Location).name}<br>
        <b>Type: </b> ${(location as Location).type}<br>
        <b>Lat,Lng: </b> ${(location as Location).latlng}<br>
        <b>Logo: </b> ${(location as Location).logo}<br>
      `).on('popupopen',()=>{
        this.onPopupOpen.emit(location.id);
      }).on('popupclose',()=>{
        this.onPopupClose.emit()
      })
    })
  }

}
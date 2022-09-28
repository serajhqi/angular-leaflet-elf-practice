import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png",
  iconAnchor:   [12, 40],
  popupAnchor:  [0, -40] 
});

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  map!: L.Map;
  @Input() latlng!: L.LatLngExpression;
  @Output() onMapClick: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = L.map('mini-map').setView(this.latlng, 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      const marker = L.marker(this.latlng).addTo(this.map);

      this.map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        this.onMapClick.emit(e);
      })
    }, 1)

  }

}

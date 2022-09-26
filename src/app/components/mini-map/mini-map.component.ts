import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "/assets/marker-icon.png",
  shadowUrl: "/assets/marker-shadow.png"
});

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  map!: L.Map;
  @Input() location: L.LatLngExpression = [ 11.000512279195748,122.58819580078126 ];
  loading:boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.map = L.map('mini-map')?.setView(this.location, 15);
      const tile_layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      L.marker(this.location).addTo(this.map);

      tile_layer.on("load",() =>  this.loading = false);
      tile_layer.on("loading",() => this.loading = true );
    }, 1)
  }

}

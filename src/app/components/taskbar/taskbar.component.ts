import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location, LocationRepository } from '../../services/state.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  @Output() onEditClick: EventEmitter<string> = new EventEmitter();

  constructor(private locationsResp: LocationRepository) { }
  location?: Location;

  ngOnInit(): void {
   this.locationsResp.tatgetLocation$.subscribe((id)=>{
    this.location = id?this.locationsResp.getLocation(id):undefined;
   })
  }

  onEditBnClick(){
    this.onEditClick.emit(this.location?.id);
  }

}

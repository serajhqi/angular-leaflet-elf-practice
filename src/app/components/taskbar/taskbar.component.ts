import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '../../services/state.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit,OnChanges {
  @Input() title:string = '';
  @Input() targetId?:string = '';
  @Output() onEditClick: EventEmitter<string> = new EventEmitter();

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.findLocation()
  }

  location?: Location;
  ngOnChanges(changes: SimpleChanges): void {
    this.findLocation()
  }

  findLocation(){
     this.location = this.targetId? this.storageService.getLocation(this.targetId)
    : undefined;
  }

  onEditBnClick(){
    this.onEditClick.emit(this.targetId);
  }

  onClearClick(){
    this.storageService.clear()
  }
}

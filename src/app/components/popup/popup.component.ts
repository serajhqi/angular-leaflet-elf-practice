import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  close(){
    console.log("closed");
    this.onClose.emit();
    this.visible = false;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() visible: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  close(){
    console.log("closed");
    this.visible = false;
  }
}

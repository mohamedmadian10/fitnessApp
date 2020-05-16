import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output()toggleNav =  new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onToggle(){
    this.toggleNav.emit()
  }

}

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()toggleNav =  new EventEmitter();
  isAuth = false;
  subscribtion:Subscription;
  constructor(private authser:AuthService) { }

  ngOnInit(): void {
    this.subscribtion =this.authser.authChange.subscribe(changed=>{
      this.isAuth = changed
    })
  }
  onToggle(){
    this.toggleNav.emit()
  }
  onLogout(){
    this.authser.logout();
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
    
  }

}

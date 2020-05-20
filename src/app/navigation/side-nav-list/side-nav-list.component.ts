import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit,OnDestroy {
  @Output() closeSidenav = new EventEmitter();
  isAuth = false;
  subscription:Subscription;
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
   this.subscription = this.authservice.authChange.subscribe(changed=>{
      this.isAuth = changed;
    })
  }

  onCloseSidenav(){
    this.closeSidenav.emit();

  }
  onLogout(){
    this.onCloseSidenav();
    this.authservice.logout();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

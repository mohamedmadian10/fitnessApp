import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';


import { WelcomeComponent } from './welcome/welcome.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import { HeaderComponent } from './navigation/header/header.component';

import { AppRoutingModule } from './app-routing.module';


import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,

    
    WelcomeComponent,
    SideNavListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    BrowserAnimationsModule,    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

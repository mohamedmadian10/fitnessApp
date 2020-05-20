import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
loadingSpinner = new Subject<boolean>() 
  constructor(private snackBar: MatSnackBar) { }
  showSnackBar(message,action,duration,verticalPosition){
    this.snackBar.open(message,action,{
      duration:duration,
      verticalPosition:verticalPosition
    })
  }
}

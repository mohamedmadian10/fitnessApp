import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { ExerciseService } from 'src/app/_services/exercise.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() exitTraining = new EventEmitter<void>()
  progress=0;
  timer;
  constructor(private dialog:MatDialog,private exersiseService:ExerciseService) { }

  ngOnInit(): void {
   this.startOrContinueCount()
    
  }
  startOrContinueCount(){
    const step = this.exersiseService.getCurrentExercise().duration /100 *1000;
    this.timer = setInterval(()=>{
      this.progress = this.progress + 1;
      if(this.progress >= 100){
        this.exersiseService.completedExercise()
        clearInterval(this.timer);
      }
    },step);
  }
  stop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{
      data:{
        progress:this.progress
      }
    });
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        // this.exitTraining.emit();
        console.log(data);
        this.exersiseService.cancelledExercise(this.progress);

      }else{
        this.startOrContinueCount();
      }
    })

  }

}

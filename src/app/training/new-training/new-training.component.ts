import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { Exercise } from 'src/app/_models/exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
currentExercise:Exercise;
  constructor(private exerService:ExerciseService) { }
  availableExersise:Exercise[]=[];
  ngOnInit(): void {
    this.availableExersise = this.exerService.getAllExercises();
  }
  onStartTraining(form:NgForm){
    console.log(form.value.exercise)
    this.exerService.newExercise(form.value.exercise);
  }

}

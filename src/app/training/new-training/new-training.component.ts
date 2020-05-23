import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { Exercise } from 'src/app/_models/exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  currentExercise: Exercise;
  availableExersise: Exercise[];
  exerSubscription: Subscription;
  isLoading = false;
  loadSub: Subscription;
  constructor(private exerService: ExerciseService, private uiSer: UiService) {}
  ngOnInit(): void {
    //  this.availableExersise = this.exerService.getAllExercises()
    this.loadSub = this.uiSer.loadingSpinner.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.exerSubscription = this.exerService.exerciseschanged.subscribe(
      (exercises) => {
        this.availableExersise = exercises;
      }
    );
    this.fetchExercises();
  }
  onStartTraining(form: NgForm) {
    // console.log(form.value.exercise);
    this.exerService.newExercise(form.value.exercise);
  }
  fetchExercises() {
    this.exerService.getAvailableExercises();
  }
  ngOnDestroy(): void {
    if (this.exerSubscription) {
      this.exerSubscription.unsubscribe();
    }
    if(this.loadSub){
      this.loadSub.unsubscribe();

    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../_services/exercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  trainingStarted = false;
  exSubscription: Subscription;
  constructor(private exerService: ExerciseService) {}

  ngOnInit(): void {
    this.exSubscription = this.exerService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.trainingStarted = true;
        }else{
          this.trainingStarted = false;

        }
      }
    );
  }
  ngOnDestroy(): void {
    this.exSubscription.unsubscribe();
  }
}

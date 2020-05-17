import { Injectable } from '@angular/core';
import { Exercise } from '../_models/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
 private availableExersise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  exercices:Exercise[] = [];
  
  private selectedExersise:Exercise;
  exerciseChanged = new Subject<Exercise>();
  constructor() {}
  getAllExercises(){
    return [...this.availableExersise];
  }

  newExercise(exerciseId){
    this.selectedExersise = this.availableExersise.find(exer=>exer.id=== exerciseId);
    this.exerciseChanged.next({...this.selectedExersise});
  }
  completedExercise(){
    this.exercices.push({...this.selectedExersise,
      date:new Date(),
      state:'completed'
    })
    this.selectedExersise = null;
    this.exerciseChanged.next(null);
  };

  cancelledExercise(progress:number){
    this.exercices.push({...this.selectedExersise,
      duration:this.selectedExersise.duration * progress /100,
      calories: this.selectedExersise.calories * progress/100,
      date:new Date(),
      state:'cancelled'
    })
    this.selectedExersise = null;
    this.exerciseChanged.next(null);

  };
  getCurrentExercise(){
    return {...this.selectedExersise}
  }
  getCompletedOrCancelled(){
    return this.exercices.slice();
  }
}

import { Injectable } from '@angular/core';
import { Exercise } from '../_models/exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UiService } from './ui.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private availableExersise: Exercise[] = [];
  //     { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //     { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //     { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //     { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  //   ];
  // finishedExercices: Exercise[] = [];
  private selectedExersise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exerciseschanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  exercisesSubscription: Subscription[] = [];
  userId;

  constructor(private db: AngularFirestore, private uiServ: UiService,private afauth:AngularFireAuth) {
    this.afauth.authState.subscribe(user=>{
      if(user) this.userId = user.uid;
    })
  }

  getAvailableExercises() {
    // return [...this.availableExersise];
    this.uiServ.loadingSpinner.next(true);
    this.exercisesSubscription.push(
      this.db
        .collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArr) => {
            return docArr.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories,
              };
            });
          })
        )
        .subscribe((exercises: Exercise[]) => {
          this.availableExersise = exercises;
          this.exerciseschanged.next([...this.availableExersise]);
          this.uiServ.loadingSpinner.next(false);
        },err=>{
          this.uiServ.loadingSpinner.next(false);
          this.uiServ.showSnackBar('Feching Exercises fialed..please try again',null,4000,'top');
          this.exerciseschanged.next(null);
        })
    );
  }

  newExercise(exerciseId) {
    this.selectedExersise = this.availableExersise.find(
      (exer) => exer.id === exerciseId
    );
    this.exerciseChanged.next({ ...this.selectedExersise });
  }
  completedExercise() {
    this.addDataToDbase({
      ...this.selectedExersise,
      date: new Date(),
      state: 'completed',
    });
    this.selectedExersise = null;
    this.exerciseChanged.next(null);
  }

  cancelledExercise(progress: number) {
    this.addDataToDbase({
      ...this.selectedExersise,
      duration: (this.selectedExersise.duration * progress) / 100,
      calories: (this.selectedExersise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled',
    });
    this.selectedExersise = null;
    this.exerciseChanged.next(null);
  }
  getCurrentExercise() {
    return { ...this.selectedExersise };
  }
  getCompletedOrCancelled() {
    // return this.finishedExercices.slice();
    if(!this.userId) return;
    this.exercisesSubscription.push(
      
      this.db.collection(`finishedExercises`).doc(this.userId).collection("finishedExercises")
        .valueChanges()
        //emit the values whenever we get new values from the server
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }
  private addDataToDbase(exercise: Exercise) {
    if(!this.userId) return;
    this.db.collection(`finishedExercises`).doc(this.userId).collection("finishedExercises").add(exercise);
  }
  cancelSubscription() {
    this.exercisesSubscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

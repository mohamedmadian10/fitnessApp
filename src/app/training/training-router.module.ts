import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuardService } from '../_services/auth-guard.service';

const routes:Routes = [
    {path:'', component:TrainingComponent},
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})
export class TrainingRouterModule {}
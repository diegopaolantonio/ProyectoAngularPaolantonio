import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './store/students.effects';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { studentsFeature } from './store/students.reducer';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(studentsFeature),
    EffectsModule.forFeature([StudentsEffects]),
  ],
})
export class StudentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { SharedModule } from '../../../../shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent, CourseDetailComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
  providers: [CoursesService],
})
export class CoursesModule {}

import { Component } from '@angular/core';
import { CourseInterface } from './models';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './component/course-form/course-form.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  displayedColumns = ['code', 'name', 'startDate', 'finishDate', 'price', 'action']

  courses: CourseInterface[] = [];

  constructor(private coursesService: CoursesService, public dialog: MatDialog) {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    })
  }

  onCreate(): void {
    this.dialog.open(CourseFormComponent).afterClosed().subscribe({
      next: (course) => {
        if(course) {
          this.coursesService.createCourse(course).subscribe({
            next: (courses) => (this.courses = courses),
          })
        }
      }
    })
  }


  onEdit(course: CourseInterface) {
    this.dialog.open(CourseFormComponent, {
      data: course,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result) {
          this.coursesService.updateCourseById(course.code, result)
          .subscribe({
            next: (courses) => (this.courses = courses),
          });
        }
      },
    });
    
  }

  onDelete(code:string) {
    this.coursesService.deleteCourseById(code).subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    })
  }
}

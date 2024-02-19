import { Component } from '@angular/core';
import { CourseInterface } from './models';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './component/course-form/course-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  codeExists: boolean = false;

  displayedColumns = [
    'code',
    'name',
    'startDate',
    'finishDate',
    'price',
    'action',
  ];

  courses: CourseInterface[] = [];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreate(): void {
    this.dialog
      .open(CourseFormComponent)
      .afterClosed()
      .subscribe({
        next: (course) => {
          this.codeExists = false;
          this.courses.forEach((element) => {
            if (element.code === course.code) this.codeExists = true;
          });
          if (course) {
            if (!this.codeExists) {
              this.coursesService.createCourse(course).subscribe({
                next: (courses) => {
                  this.courses = courses;
                  Swal.fire({
                    icon: 'success',
                    title: 'Curso creado',
                  });
                },
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'El codigo cargado ya existe en la BD',
              });
            }
          }
        },
      });
  }

  onEdit(course: CourseInterface) {
    this.dialog
      .open(CourseFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.updateCourseById(course.id, result).subscribe({
              next: (courses) => {
                this.courses = courses;
                Swal.fire({
                  icon: 'success',
                  title: 'Curso modificado',
                });
              },
            });
          }
        },
      });
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Esta seguro de eliminar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCourseById(id).subscribe({
          next: (courses) => {
            this.courses = courses;
            Swal.fire({
              title: 'Curso eliminado!',
              icon: 'success',
            });
          },
        });
      }
    });
  }
}

import { Component } from '@angular/core';
import { CourseInterface } from './models';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './components/course-form/course-form.component';
import Swal from 'sweetalert2';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../../../auth/pages/login/store/login.selectors';
import { DashboardActions } from '../../store/dashboard.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  codeExists: boolean = false;
  adminUser: boolean = false;

  displayedColumns = ['code', 'name', 'teacher', 'startDate', 'action'];

  courses: CourseInterface[] = [];

  constructor(
    private coursesService: CoursesService,
    private store: Store,
    public matDialog: MatDialog
  ) {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });

    this.store.select(selectLoginUser).subscribe({
      next: (user) =>
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
    });

    this.store.dispatch(DashboardActions.activeSection({ tittle: 'Cursos' }));
  }

  onCreate(): void {
    this.matDialog
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
    this.matDialog
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

  onView(course: CourseInterface) {
    this.matDialog
      .open(CourseDetailComponent, {
        data: course.id,
      })
      .afterClosed()
      .subscribe({
        next: () =>
          this.coursesService.getCourses().subscribe({
            next: (courses) => {
              this.courses = courses;
            },
          }),
      });
  }
}

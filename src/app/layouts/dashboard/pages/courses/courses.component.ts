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
import { Pagination } from '../../../../core/models';
import { PageEvent } from '@angular/material/paginator';

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
  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private coursesService: CoursesService,
    private store: Store,
    public matDialog: MatDialog
  ) {
    this.store.select(selectLoginUser).subscribe({
      next: (user) =>
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
    });
    this.getPageData();
    this.store.dispatch(DashboardActions.activeSection({ tittle: 'Cursos' }));
  }

  // ngOnInit(): void {
  //   this.getPageData();
  // }

  getPageData(): void {
    this.coursesService.getCourses(this.currentPage, this.pageSize).subscribe({
      next: (paginationResult: Pagination<CourseInterface[]>) => {
        this.totalItems = paginationResult.items;
        this.courses = paginationResult.data;
      },
    });
  }

  onPage(ev: PageEvent) {
    this.currentPage = ev.pageIndex + 1;
    this.pageSize = ev.pageSize;
    this.coursesService.getCourses(this.currentPage, this.pageSize).subscribe({
      next: (paginateResult: Pagination<CourseInterface[]>) => {
        this.totalItems = paginateResult.items;
        this.courses = paginateResult.data;
      },
    });
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
              this.coursesService
                .createCourse(course, this.currentPage, this.pageSize)
                .subscribe({
                  next: (courses) => {
                    this.courses = courses.data;
                    Swal.fire({
                      icon: 'success',
                      title: 'Curso creado',
                    }).finally(() => location.reload());
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
            this.coursesService
              .updateCourseById(
                course.id,
                result,
                this.currentPage,
                this.pageSize
              )
              .subscribe({
                next: (courses) => {
                  this.courses = courses.data;
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
        this.coursesService
          .deleteCourseById(id, this.currentPage, this.pageSize)
          .subscribe({
            next: (courses) => {
              this.courses = courses.data;
              Swal.fire({
                title: 'Curso eliminado!',
                icon: 'success',
              }).finally(() => location.reload());
            },
          });
      }
    });
  }

  onView(course: CourseInterface) {
    this.matDialog
      .open(CourseDetailComponent, {
        data: [course.id, this.currentPage, this.pageSize],
      })
      .afterClosed()
      .subscribe({
        next: () =>
          this.coursesService
            .getCourses(this.currentPage, this.pageSize)
            .subscribe({
              next: (courses) => {
                this.courses = courses.data;
              },
            }),
      });
  }
}

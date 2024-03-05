import { Component, Inject } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourseInterface } from '../../models';
import { environment } from '../../../../../../../environments/environment';
import { CourseFormComponent } from '../course-form/course-form.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../../../../../auth/pages/login/store/login.selectors';
import { StudentInterface } from '../../../students/models';
import { InscriptionInterface } from '../../../inscriptions/models';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  course$: Observable<CourseInterface[]>;
  course: CourseInterface = {
    id: '',
    code: '',
    name: '',
    hours: 0,
    classes: 0,
    teacher: '',
    startDate: new Date(),
    finishDate: new Date(),
    price: 0,
  };
  inscriptions: InscriptionInterface[] | null = null;
  adminUser: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<CourseDetailComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private viewCourseId: string
  ) {
    this.course$ = this.httpClient.get<CourseInterface[]>(
      `${environment.apiURL}/courses?id=${viewCourseId}`
    );
    this.course$.subscribe({
      next: (response) => {
        this.course = response[0];

        this.httpClient
          .get<InscriptionInterface[]>(
            `${environment.apiURL}/inscriptions?_embed=student&_embed=course&courseId=${this.course.id}`
          )
          .subscribe({
            next: (inscriptions: InscriptionInterface[]) =>
              (this.inscriptions = inscriptions),
          });
      },
    });

    this.store.select(selectLoginUser).subscribe({
      next: (user) =>
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
    });
  }

  onUpdate(course: CourseInterface): void {
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
                Swal.fire({
                  icon: 'success',
                  title: 'Curso modificado',
                }).then(() => {
                  this.matDialogRef.close(courses);
                });
              },
            });
          }
        },
      });
  }

  onDelete(courseId: string): void {
    Swal.fire({
      title: 'Esta seguro de eliminar el curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCourseById(courseId).subscribe({
          next: (courses) => {
            Swal.fire({ title: 'Curso eliminado!', icon: 'success' }).then(
              () => {
                this.matDialogRef.close(courses);
              }
            );
          },
        });
      }
    });
  }
}

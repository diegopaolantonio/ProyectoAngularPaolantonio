import { Component, Inject } from '@angular/core';
import { StudentInterface, updateStudentInterface } from '../../models';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Store } from '@ngrx/store';
import { StudentsActions } from '../../store/students.actions';
import { selectLoginUser } from '../../../../../auth/pages/login/store/login.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { InscriptionInterface } from '../../../inscriptions/models';
import Swal from 'sweetalert2';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student: StudentInterface = { id: '', name: '', profile: '', gender: '' };
  adminUser: boolean = false;
  inscriptions: InscriptionInterface[] | null = null;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<StudentDetailComponent>,
    private httpClient: HttpClient,
    private inscriptionsService: InscriptionsService,
    @Inject(MAT_DIALOG_DATA) private viewStudent?: StudentInterface
  ) {
    if (viewStudent) {
      this.student = viewStudent;
    }

    this.httpClient
      .get<InscriptionInterface[]>(
        `${environment.apiURL}/inscriptions?_embed=student&_embed=course&studentId=${this.student.id}`
      )
      .subscribe({
        next: (inscriptions) => (this.inscriptions = inscriptions),
      });

    this.store.select(selectLoginUser).subscribe({
      next: (user) =>
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
    });
  }

  onUpdate(student: StudentInterface): void {
    this.matDialog.open(StudentFormComponent, {
      data: { student, updateString: 'update' },
    });
  }

  onDelete(studentId: string): void {
    this.store.dispatch(StudentsActions.deleteStudent({ studentId }));
  }

  onDeleteCourse(inscription: InscriptionInterface): void {
    Swal.fire({
      title: 'Esta seguro de eliminar la inscripcion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscriptionsService
          .deleteInscriptionById(inscription.id)
          .subscribe({
            next: (inscriptions) => {
              Swal.fire({
                title: 'Inscripcion eliminada!',
                icon: 'success',
              }).then(() => {
                this.matDialogRef.close(inscriptions);
              });
            },
          });
      }
    });
  }
}

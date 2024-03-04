import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseInterface } from '../../../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { selectInscriptionsCourses, selectInscriptionsStudents} from '../../store/inscriptions.selectors';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { UpdateInscriptionInterface } from '../../models';
import { StudentInterface } from '../../../students/models';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss',
})
export class InscriptionFormComponent {

  students$: Observable<StudentInterface[]>;
  courses$: Observable<CourseInterface[]>;

  inscriptionForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptionFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    private editInscription?: UpdateInscriptionInterface
  ) {
    this.inscriptionForm = this.formBuilder.group({
      studentId: this.formBuilder.control('', Validators.required),
      courseId: this.formBuilder.control('', Validators.required),
    });

    this.store.dispatch(InscriptionsActions.loadStudents());
    this.store.dispatch(InscriptionsActions.loadCourses());

    this.students$ = this.store.select(selectInscriptionsStudents);
    this.courses$ = this.store.select(selectInscriptionsCourses);

    if (editInscription?.inscription) {
      this.inscriptionForm.patchValue(editInscription.inscription);
    }
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      if (!this.editInscription?.updateString) {
        this.store.dispatch(
          InscriptionsActions.createInscription({
            inscription: this.inscriptionForm.value,
          })
        );
      } else {
        this.store.dispatch(
          InscriptionsActions.updateInscription({
            inscriptionId: this.editInscription.inscription.id,
            inscription: this.inscriptionForm.value,
          })
        );
      }
      this.matDialogRef.close();
    }
  }
}

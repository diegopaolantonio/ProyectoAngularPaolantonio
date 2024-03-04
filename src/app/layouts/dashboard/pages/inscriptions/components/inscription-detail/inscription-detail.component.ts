import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionInterface } from '../../models';
import { environment } from '../../../../../../../environments/environment';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';
import { InscriptionsActions } from '../../store/inscriptions.actions';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrl: './inscription-detail.component.scss',
})
export class InscriptionDetailComponent {
  inscription$: Observable<InscriptionInterface[]>;
  inscription: InscriptionInterface = { id: '', studentId: '', courseId: '' };

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private viewInscriptionId: string
  ) {
    this.inscription$ = this.httpClient.get<InscriptionInterface[]>(
      `${environment.apiURL}/inscriptions?_embed=student&_embed=course&id=${viewInscriptionId}`
    );
    this.inscription$.subscribe({
      next: (response) => {
        console.log(response),
        this.inscription = response[0]},
    });
  }

  onUpdate(inscription: InscriptionInterface): void {
    this.matDialog.open(InscriptionFormComponent, {
      data: { inscription, updateString: 'update' },
    });
  }

  onDelete(inscriptionId: string): void {
    this.store.dispatch(
      InscriptionsActions.deleteInscription({ inscriptionId })
    );
  }
}

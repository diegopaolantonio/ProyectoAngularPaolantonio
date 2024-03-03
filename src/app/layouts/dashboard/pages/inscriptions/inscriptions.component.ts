import { Component, OnDestroy } from '@angular/core';
import { InscriptionInterface } from './models';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {
  selectInscriptions,
  selectLoadingInscriptions,
} from './store/inscriptions.selectors';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { InscriptionsActions } from './store/inscriptions.actions';
import { InscriptionsService } from './inscriptions.service';

const updateString = 'update';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnDestroy {
  inscriptions: InscriptionInterface[] = [];
  isLoading$: Observable<boolean>;
  inscriptionsSubscription?: Subscription;

  destroyed$ = new Subject();

  displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'code',
    'name',
    'action',
  ];

  constructor(
    private store: Store,
    private inscriptionsService: InscriptionsService,
    private matDialog: MatDialog
  ) {
    this.store
      .select(selectInscriptions)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (inscriptions) => {
          this.inscriptions = inscriptions;
        },
      });

    this.isLoading$ = this.store.select(selectLoadingInscriptions);
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  createInscription(): void {
    this.matDialog.open(InscriptionFormComponent);
  }

  deleteInscriptionById(inscriptionId: string) {
    this.store.dispatch(
      InscriptionsActions.deleteInscriptions({ inscriptionId })
    );
  }

  updateInscriptionById(inscription: InscriptionInterface): void {
    this.matDialog.open(InscriptionFormComponent, {
      data: { inscription, updateString },
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

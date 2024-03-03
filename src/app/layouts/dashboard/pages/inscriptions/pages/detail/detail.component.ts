import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInterface } from '../../../users/models/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InscriptionInterface } from '../../models/index';
import { InscriptionsService } from '../../inscriptions.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  inscription$: Observable<InscriptionInterface[]>;
  inscription: InscriptionInterface;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private inscriptionsService: InscriptionsService
  ) {
    this.inscription = { id: '', userId: '', courseId: '' };
    this.inscription$ = this.httpClient.get<InscriptionInterface[]>(
      `${environment.apiURL}/inscriptions?_embed=user&_embed=course&id=${this.route.snapshot.params['id']}`
    );
    this.inscription$.subscribe({
      next: (response) => (this.inscription = response[0]),
    });
  }

  onUpdate(inscriptionId: string, inscription: InscriptionInterface): void {
    this.inscriptionsService.updateInscriptionById(inscriptionId, inscription);
  }

  onDelete(inscriptionId: string): void {
    this.inscriptionsService.deleteInscriptionById(inscriptionId);
  }
}

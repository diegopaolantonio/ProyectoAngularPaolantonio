import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  declarations: [InscriptionsComponent, InscriptionFormComponent, DetailComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
  ],
})
export class InscriptionsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UserFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}

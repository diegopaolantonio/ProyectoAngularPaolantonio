import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersService } from './users.service';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [UsersComponent, UserFormComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  providers: [UsersService],
})
export class UsersModule {}

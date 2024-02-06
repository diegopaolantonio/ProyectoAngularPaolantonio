import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    UsersModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then((module) => module.UsersModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((module) => module.CoursesModule),
      },
    ])
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}

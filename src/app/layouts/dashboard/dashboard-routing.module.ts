import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';
import { userGuard } from '../../core/guards/user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((module) => module.UsersModule),
  },
  {
    path: 'students',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./pages/students/students.module').then(
        (module) => module.StudentsModule
      ),
  },
  {
    path: 'courses',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./pages/courses/courses.module').then(
        (module) => module.CoursesModule
      ),
  },
  {
    path: 'inscriptions',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./pages/inscriptions/inscriptions.module').then(
        (module) => module.InscriptionsModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

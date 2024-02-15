import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  fecha = new Date();

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}

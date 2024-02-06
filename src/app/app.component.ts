import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'proyectoAngularPaolantonio';

  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe({
      next: (value) => {
        setTimeout(() => {
          this.isLoading = value;
        });
      },
    });
  }
}

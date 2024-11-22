import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  currentUser = inject(AuthService).currentUser;

  onButtonNavigate() {
    if (this.currentUser()) {
      this.router.navigate(['plans']);
    } else {
      this.router.navigate(['login']);
    }
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  isAuthInfoShown = signal(false);
  isSubmitted = signal<boolean>(false);

  ngOnInit(): void {
    this.authService.getUserById(this.currentUser().id);
  }

  onUserInfoClick() {
    this.isAuthInfoShown.set(true);
  }

  onPersonalInfoClick() {
    this.isAuthInfoShown.set(false);
  }
}

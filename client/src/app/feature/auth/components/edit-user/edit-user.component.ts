import { Component, effect, inject } from '@angular/core';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [UserEditFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  selectedUser = this.authService.selectedUser;

  constructor() {
    effect(() => {
      if (!this.selectedUser()) return;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedUser()) {
      this.authService.getSelectedUser(id);
    }
  }
}

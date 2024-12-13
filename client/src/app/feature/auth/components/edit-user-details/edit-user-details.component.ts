import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import {
  CreateUserDetailsReq,
  UpdateUserDetailsReq,
} from '../../models/auth.model';
import { UserDetailsService } from '../../../../core/services/user-details.service';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [UserDetailsFormComponent],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss',
})
export class EditUserDetailsComponent {
  private authService = inject(AuthService);
  private userDetailsService = inject(UserDetailsService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  onEdituserDetails(editUserDetails: UpdateUserDetailsReq) {
    this.userDetailsService.updateUserDetails(
      this.currentUser().userDetails.id,
      editUserDetails
    );
    this.router.navigate(['user-panel']);
  }
}

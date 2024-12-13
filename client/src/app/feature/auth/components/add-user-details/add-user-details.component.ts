import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CreateUserDetailsReq } from '../../models/auth.model';
import { UserDetailsService } from '../../../../core/services/user-details.service';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';

@Component({
  selector: 'app-add-user-details',
  standalone: true,
  imports: [UserDetailsFormComponent],
  templateUrl: './add-user-details.component.html',
  styleUrl: './add-user-details.component.scss',
})
export class AddUserDetailsComponent {
  private userDetailsService = inject(UserDetailsService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  onAddUserDetails(addUserDetails: CreateUserDetailsReq) {
    this.userDetailsService.createUserDetails(
      this.currentUser().id,
      addUserDetails
    );
  }
}

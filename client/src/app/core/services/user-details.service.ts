import { inject, Injectable } from '@angular/core';
import {
  CreateUserDetailsReq,
  PorfilePhotoReq,
  UpdateUserDetailsReq,
} from '../../feature/auth/models/auth.model';
import { UserDetailsApiService } from './user-details-api.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private apiService = inject(UserDetailsApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  createUserDetails(userId: string, userDetails: CreateUserDetailsReq) {
    this.apiService.createUserDetails(userId, userDetails).subscribe({
      next: () => {
        this.notificationService.showToast(
          'Successfully added user details!',
          true
        );
        this.router.navigate(['user-panel']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateUserDetails(
    userDetailsId: string,
    editUserDetails: UpdateUserDetailsReq
  ) {
    this.apiService
      .updateUserDetails(userDetailsId, editUserDetails)
      .subscribe({
        next: () => {
          this.notificationService.showToast(
            'Successfully updated user details!',
            true
          );
          this.router.navigate(['user-panel']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addPhotoToUser(userDetailsId: string, profilePhoto: PorfilePhotoReq) {
    this.apiService
      .addPhotoToUserDetails(userDetailsId, profilePhoto)
      .subscribe({
        next: () => {
          this.notificationService.showToast(
            'Successfully updated profile picture!',
            true
          );
          this.router.navigate(['user-panel']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

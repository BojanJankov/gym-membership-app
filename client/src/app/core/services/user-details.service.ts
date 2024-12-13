import { inject, Injectable } from '@angular/core';
import {
  CreateUserDetailsReq,
  PorfilePhotoReq,
  UpdateUserDetailsReq,
} from '../../feature/auth/models/auth.model';
import { UserDetailsApiService } from './user-details-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private apiService = inject(UserDetailsApiService);
  private router = inject(Router);

  createUserDetails(userId: string, userDetails: CreateUserDetailsReq) {
    this.apiService.createUserDetails(userId, userDetails).subscribe({
      next: () => {
        console.log('User details added');
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
          console.log('User details updated');
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
          console.log('Photo uploded');
          this.router.navigate(['user-panel']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateUserDetailsReq,
  PorfilePhotoReq,
  UpdateUserDetailsReq,
} from '../../feature/auth/models/auth.model';
import { BASE_URL } from '../constants/core.constants';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsApiService {
  private http = inject(HttpClient);

  createUserDetails(userId: string, userDetails: CreateUserDetailsReq) {
    return this.http.post(`${BASE_URL}/user-details/${userId}`, userDetails);
  }

  updateUserDetails(userDetailsId: string, userDetails: UpdateUserDetailsReq) {
    return this.http.patch(
      `${BASE_URL}/user-details/${userDetailsId}`,
      userDetails
    );
  }

  addPhotoToUserDetails(userDetailsId: string, profilePhoto: PorfilePhotoReq) {
    return this.http.post(
      `${BASE_URL}/user-details/add-photo/${userDetailsId}`,
      profilePhoto
    );
  }
}

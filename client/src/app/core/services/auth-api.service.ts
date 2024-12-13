import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterReq,
  UpdatePasswordReq,
  UpdateUserReq,
  User,
  UserCredentails,
  UserDetails,
} from '../../feature/auth/models/auth.model';
import { BASE_URL } from '../constants/core.constants';
import { Membership } from '../../feature/memberships/models/memberships.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  registerUser(reqeust: RegisterReq) {
    return this.http.post(`${BASE_URL}/auth/register`, reqeust);
  }

  addUser(reqeust: RegisterReq) {
    return this.http.post(`${BASE_URL}/users`, reqeust);
  }

  loginUser(userCredentials: UserCredentails) {
    return this.http.post<User>(`${BASE_URL}/auth/login`, userCredentials, {
      observe: 'response',
    });
  }

  logOutUser(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/refresh-token`, {
      headers: {
        'refresh-token': refreshToken,
      },
      observe: 'response',
    });
  }

  fetchAllUsers() {
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }

  getUserById(userId: string) {
    return this.http.get<User>(`${BASE_URL}/users/${userId}`);
  }

  updateUser(userId: string, updateUserData: UpdateUserReq) {
    return this.http.patch(`${BASE_URL}/users/${userId}`, updateUserData);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${BASE_URL}/users/${userId}`);
  }

  getUserDetilsByUser(userId: string) {
    return this.http.get<UserDetails>(
      `${BASE_URL}/users/user-details/${userId}`
    );
  }

  updatePasswordOnUser(userId: string, updatePasswordDto: UpdatePasswordReq) {
    return this.http.post(
      `${BASE_URL}/users/change-password/${userId}`,
      updatePasswordDto
    );
  }
}

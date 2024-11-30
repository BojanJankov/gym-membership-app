import { inject, Injectable, signal } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';
import {
  RegisterReq,
  User,
  UserCredentails,
} from '../../feature/auth/models/auth.model';
import { tap } from 'rxjs';
import { Membership } from '../../feature/memberships/models/memberships.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(AuthApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  currentUser = signal<User>(null);
  selectedUser = signal<User>(null);
  currentUserMemberships = signal<Membership[]>([]);
  users = signal<User[]>([]);

  constructor() {
    this.getCurrentUserFromLocalStorage();
  }

  createUser(request: RegisterReq) {
    this.apiService.addUser(request).subscribe({
      next: () => {
        console.log('User added');
        this.notificationService.showToast('Successfully added user!', true);
      },
      error: (error) => {
        this.notificationService.showToast(error, false);
      },
    });
  }

  registerUser(request: RegisterReq) {
    this.apiService.registerUser(request).subscribe({
      next: () => {
        console.log('User registered');
        this.router.navigate(['login']);
        this.notificationService.showToast(
          'Successfully registered, please log in with your new account!',
          true
        );
      },
      error: (error) => {
        this.notificationService.showToast(error, false);
      },
    });
  }

  loginUser(userCredentials: UserCredentails) {
    this.apiService.loginUser(userCredentials).subscribe({
      next: (response) => {
        const token = response.headers.get('access-token');

        const refreshToken = response.headers.get('refresh-token');

        this.currentUser.set({ ...response.body, token, refreshToken });

        this.saveCurrentUserToLocalStorage(this.currentUser());

        this.router.navigate(['']);

        this.notificationService.showToast('Successfully logged in!', true);
      },
      error: (error) => {
        this.notificationService.showToast(error.error.message, false);
      },
    });
  }

  saveCurrentUserToLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUserFromLocalStorage() {
    const currentUserJSON = localStorage.getItem('currentUser');

    if (!currentUserJSON) return;

    this.currentUser.set(JSON.parse(currentUserJSON));
  }

  logOutUserFromServer() {
    this.apiService.logOutUser(this.currentUser().refreshToken).subscribe();
  }

  logOutUser() {
    this.currentUser.set(null);
    localStorage.clear();
    this.router.navigate(['login']);
    this.notificationService.showToast('You are logged out!', true);
  }

  refreshAccessToken(refreshToken: string) {
    return this.apiService.refreshAccessToken(refreshToken).pipe(
      tap((response) => {
        const token = response.headers.get('access-token');
        const refreshToken = response.headers.get('refresh-token');

        this.currentUser.update((prev) => ({
          ...prev,
          token,
          refreshToken,
        }));

        this.saveCurrentUserToLocalStorage(this.currentUser());
      })
    );
  }

  getAllUsers() {
    this.apiService.fetchAllUsers().subscribe({
      next: (response) => {
        this.users.set(response);
      },
      error: (error) => console.log(error),
    });
  }

  getUserById(userId: string) {
    this.apiService.getUserById(userId).subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.saveCurrentUserToLocalStorage({
          ...value,
          token: this.currentUser().token,
          refreshToken: this.currentUser().refreshToken,
        });
      },
      error: (error) => console.log(error),
    });
  }

  getSelectedUser(userId: string) {
    this.apiService.getUserById(userId).subscribe({
      next: (value) => {
        this.selectedUser.set(value);
      },
      error: (error) => console.log(error),
    });
  }
}

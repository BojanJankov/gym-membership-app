import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { UpdatePasswordReq } from '../../models/auth.model';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  isAuthInfoShown = signal(false);
  isSubmitted = signal<boolean>(false);
  changePasswordForm = this.generateChangePasswordForm();

  ngOnInit(): void {
    this.authService.getUserDetailsByUser(this.currentUser().id);
  }

  onSettingsButtonClick() {
    this.isAuthInfoShown.set(true);
  }

  onBackButtonClick() {
    this.isAuthInfoShown.set(false);
  }

  onAddDetailsClick() {
    this.router.navigate(['add-user-details']);
  }

  onEditDetailsClick() {
    this.router.navigate(['edit-user-details', this.currentUser().id]);
  }

  onUploadPhotoClick() {
    this.router.navigate(['add-user-photo']);
  }

  // New Password form

  generateChangePasswordForm() {
    return new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.max(30),
          Validators.min(8),
        ]),
        confirmNewPassword: new FormControl('', [Validators.required]),
      },
      this.confirmPasswordValidator
    );
  }

  confirmPasswordValidator(form: AbstractControl): null {
    const passwordControl = form.get('newPassword');
    const confirmPasswordControl = form.get('confirmNewPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }

  onSubmitChangePassForm() {
    this.changePasswordForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.changePasswordForm.invalid) return;

    const updatePasswordReq: UpdatePasswordReq = {
      newPassword: this.changePasswordForm.value.newPassword,
    };

    this.authService.updatePasswordOnUser(
      this.currentUser().id,
      updatePasswordReq
    );

    this.changePasswordForm.reset();
  }
}

import { Component, effect, inject, input, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isEmail } from 'validator';
import { UpdateUserReq, User } from '../../models/auth.model';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss',
})
export class UserEditFormComponent {
  isSubmitted = signal(false);
  editUserData = input<User>();
  private authService = inject(AuthService);

  userForm = this.generateUserForm();

  generateUserForm() {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.nameValidator,
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.nameValidator,
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        this.emailValidator,
      ]),
    });
  }

  constructor() {
    effect(() => {
      if (this.editUserData()) {
        const editData: UpdateUserReq = {
          firstName: this.editUserData().firstName,
          lastName: this.editUserData().lastName,
          username: this.editUserData().username,
          email: this.editUserData().email,
        };
        this.populateForm(editData);
      }
    });
  }

  populateForm(user: UpdateUserReq) {
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  }

  nameValidator(control: FormControl): { [key: string]: boolean } | null {
    let firstNameRegex = '^[a-zA-Z]+$';

    if (!control.value.match(firstNameRegex)) {
      return { validName: true };
    }

    return null;
  }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!isEmail(control.value)) {
      return { validEmail: true };
    }

    return null;
  }

  onFormSubmit() {
    this.userForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.userForm.invalid) return;

    const editUserData: UpdateUserReq = {
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      username: this.userForm.controls.username.value,
      email: this.userForm.controls.email.value,
    };

    console.log(this.userForm.value);

    this.authService.updateUser(this.editUserData().id, editUserData);
  }
}

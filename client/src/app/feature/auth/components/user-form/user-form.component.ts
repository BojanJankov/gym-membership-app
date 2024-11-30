import { Component, inject, output, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isEmail } from 'validator';
import { RegisterReq } from '../../models/auth.model';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  isSubmitted = signal(false);
  subbmitOutput = output<RegisterReq>();
  private authService = inject(AuthService);

  userForm = this.generateUserForm();

  generateUserForm() {
    return new FormGroup(
      {
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
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.confirmPasswordValidator
    );
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

  confirmPasswordValidator(form: AbstractControl): null {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }

    return null;
  }

  onFormSubmit() {
    this.userForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.userForm.invalid) return;

    const registerReq: RegisterReq = {
      firstName: this.userForm.controls.firstName.value,
      lastName: this.userForm.controls.lastName.value,
      username: this.userForm.controls.username.value,
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
    };

    console.log(this.userForm.value);

    this.subbmitOutput.emit(registerReq);
  }
}

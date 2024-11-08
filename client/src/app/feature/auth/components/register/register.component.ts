import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';
import isEmail from 'validator/lib/isEmail';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterReq } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isSubmitted = signal(false);
  private authService = inject(AuthService);

  registerForm = this.generateRegisterForm();

  generateRegisterForm() {
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
    console.log('email validator', isEmail(control.value));
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
    this.registerForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.registerForm.invalid) return;

    const registerReq: RegisterReq = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
    };

    this.authService.registerUser(registerReq);

    console.log(this.registerForm.value);
  }
}

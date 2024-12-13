import { Component, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PorfilePhotoReq } from '../../models/auth.model';

@Component({
  selector: 'app-user-photo-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './user-photo-form.component.html',
  styleUrl: './user-photo-form.component.scss',
})
export class UserPhotoFormComponent {
  userPhotoForm = this.generateUserPhotoForm();
  isSubbmited = signal<boolean>(false);

  subbmitOutput = output<PorfilePhotoReq>();

  generateUserPhotoForm() {
    return new FormGroup({
      photo: new FormControl<string>('', [Validators.required]),
    });
  }

  onSubmitPhotoForm() {
    this.userPhotoForm.markAllAsTouched();
    this.isSubbmited.set(true);

    if (this.userPhotoForm.invalid) return;

    const newProfilePhotoReq: PorfilePhotoReq = {
      profilePhoto: this.userPhotoForm.value.photo,
    };

    this.subbmitOutput.emit(newProfilePhotoReq);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file);
    }
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userPhotoForm.controls['photo'].setValue(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

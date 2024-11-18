import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Trainer, TrainerReq } from '../../models/trainers.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-trainer-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './trainer-form.component.html',
  styleUrl: './trainer-form.component.scss',
})
export class TrainerFormComponent {
  currentUser = inject(AuthService).currentUser;
  editTrainerData = input<Trainer>();
  trainerForm = this.generateTrainerForm();
  isSubbmited = signal<boolean>(false);
  subbmitOutput = output<TrainerReq>();

  generateTrainerForm() {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      photo: new FormControl('', Validators.required),
      expirience: new FormControl<number>(null, Validators.required),
      age: new FormControl<number>(null, [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
    effect(() => {
      if (this.editTrainerData()) {
        const editData: TrainerReq = {
          firstName: this.editTrainerData().firstName,
          lastName: this.editTrainerData().lastName,
          age: this.editTrainerData().age,
          photo: this.editTrainerData().photo,
          expirience: this.editTrainerData().expirience,
          phoneNumber: this.editTrainerData().phoneNumber,
          email: this.editTrainerData().email,
        };
        this.populateForm(editData);
      }
    });
  }

  populateForm(trainer: TrainerReq) {
    this.trainerForm.setValue({
      firstName: trainer.firstName,
      lastName: trainer.lastName,
      photo: trainer.photo,
      expirience: trainer.expirience,
      age: trainer.age,
      phoneNumber: trainer.phoneNumber,
      email: trainer.email,
    });
  }

  onFormSubbmit() {
    this.trainerForm.markAllAsTouched();

    if (this.trainerForm.invalid) return;

    const createPlanData: TrainerReq = {
      firstName: this.trainerForm.get('firstName').value,
      lastName: this.trainerForm.get('lastName').value,
      photo: this.trainerForm.get('photo').value,
      expirience: this.trainerForm.get('expirience').value,
      age: this.trainerForm.get('age').value,
      phoneNumber: this.trainerForm.get('phoneNumber').value,
      email: this.trainerForm.get('email').value,
    };

    this.subbmitOutput.emit(createPlanData);
  }
}

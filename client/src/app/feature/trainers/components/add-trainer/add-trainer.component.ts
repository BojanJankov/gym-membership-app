import { Component } from '@angular/core';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [TrainerFormComponent],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.scss',
})
export class AddTrainerComponent {}

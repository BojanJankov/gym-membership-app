import { Component, inject } from '@angular/core';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { TrainersService } from '../../../../core/services/trainers.service';
import { TrainerReq } from '../../models/trainers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [TrainerFormComponent],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.scss',
})
export class AddTrainerComponent {
  private trainerService = inject(TrainersService);

  onAddTrainer(trainerData: TrainerReq) {
    this.trainerService.createTrainer(trainerData);
  }
}

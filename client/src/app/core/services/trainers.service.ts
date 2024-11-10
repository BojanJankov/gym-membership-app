import { inject, Injectable, signal } from '@angular/core';
import { TrainersApiService } from './trainers-api.service';
import {
  Trainer,
  TrainerReq,
} from '../../feature/trainers/models/trainers.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  private apiService = inject(TrainersApiService);

  trainers = signal<Trainer[]>([]);

  getAllTrainers() {
    this.apiService.fetchAllTrainers().subscribe({
      next: (response) => {
        this.trainers.set(response);
      },
      error: (error) => console.log(error),
    });
  }

  createTrainer(trainerReq: TrainerReq) {
    this.apiService.postTrainer(trainerReq).subscribe({
      next: () => {
        console.log('Trainer created');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateTrainer(trainerId: number, trainerReq: TrainerReq) {
    this.apiService.patchTrainer(trainerId, trainerReq).subscribe({
      next: () => {
        console.log('Trainer successfully updated');
      },
      error: (error) => console.log(error),
    });
  }

  removeTrainer(trainerId: number) {
    this.apiService.deleteTrainer(trainerId).subscribe({
      next: () => {
        console.log('Successfully deleted trainer');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

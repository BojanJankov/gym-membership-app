import { inject, Injectable, signal } from '@angular/core';
import { TrainersApiService } from './trainers-api.service';
import {
  Trainer,
  TrainerReq,
} from '../../feature/trainers/models/trainers.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  private apiService = inject(TrainersApiService);
  private notificationService = inject(NotificationService);

  trainers = signal<Trainer[]>([]);
  selectedTrainer = signal<Trainer>(null);

  getAllTrainers() {
    this.apiService.fetchAllTrainers().subscribe({
      next: (response) => {
        this.trainers.set(response);
      },
      error: (error) => console.log(error),
    });
  }

  getTrainerById(trainerId: number) {
    this.apiService.fetchTrainerByID(trainerId).subscribe({
      next: (response) => {
        this.selectedTrainer.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createTrainer(trainerReq: TrainerReq) {
    this.apiService.postTrainer(trainerReq).subscribe({
      next: () => {
        this.notificationService.showToast(
          'Successfully created trainer!',
          true
        );
      },
      error: (error) => {
        this.notificationService.showToast(error.error.message, false);
      },
    });
  }

  updateTrainer(trainerId: number, trainerReq: TrainerReq) {
    this.apiService.patchTrainer(trainerId, trainerReq).subscribe({
      next: () => {
        this.notificationService.showToast(
          'Successfully updated trainer!',
          true
        );
      },
      error: (error) =>
        this.notificationService.showToast(error.error.message, false),
    });
  }

  removeTrainer(trainerId: number) {
    this.apiService.deleteTrainer(trainerId).subscribe({
      next: () => {
        this.notificationService.showToast(
          'Successfully deleted trainer!',
          true
        );
      },
      error: (error) => {
        this.notificationService.showToast(error.error.message, false);
      },
    });
  }
}

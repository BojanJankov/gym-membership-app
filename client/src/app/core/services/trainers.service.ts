import { inject, Injectable, signal } from '@angular/core';
import { TrainersApiService } from './trainers-api.service';
import { Trainer } from '../../feature/trainers/models/trainers.model';

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
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants/core.constants';
import {
  Trainer,
  TrainerReq,
} from '../../feature/trainers/models/trainers.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersApiService {
  private http = inject(HttpClient);

  fetchAllTrainers() {
    return this.http.get<Trainer[]>(`${BASE_URL}/trainers`);
  }

  fetchTrainerByID(trainerId: number) {
    return this.http.get<Trainer>(`${BASE_URL}/trainers/${trainerId}`);
  }

  postTrainer(request: TrainerReq) {
    return this.http.post(`${BASE_URL}/trainers`, request);
  }

  patchTrainer(trainerId: number, request: TrainerReq) {
    return this.http.patch(`${BASE_URL}/trainers/${trainerId}`, request);
  }

  deleteTrainer(trainerId: number) {
    return this.http.delete(`${BASE_URL}/trainers/${trainerId}`);
  }
}

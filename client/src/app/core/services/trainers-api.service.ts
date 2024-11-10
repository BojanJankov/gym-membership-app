import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants/core.constants';
import { Trainer } from '../../feature/trainers/models/trainers.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersApiService {
  private http = inject(HttpClient);

  fetchAllTrainers() {
    return this.http.get<Trainer[]>(`${BASE_URL}/trainers`);
  }
}

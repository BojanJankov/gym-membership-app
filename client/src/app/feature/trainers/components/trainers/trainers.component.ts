import { Component, inject, OnInit } from '@angular/core';
import { TrainersService } from '../../../../core/services/trainers.service';
import { TrainerCardComponent } from '../trainer-card/trainer-card.component';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [TrainerCardComponent],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.scss',
})
export class TrainersComponent implements OnInit {
  private trainersService = inject(TrainersService);

  trainers = this.trainersService.trainers;

  ngOnInit() {
    this.trainersService.getAllTrainers();
    console.log(this.trainers());
  }
}

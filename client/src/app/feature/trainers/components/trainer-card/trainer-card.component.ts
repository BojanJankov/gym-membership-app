import { Component, input } from '@angular/core';
import { Trainer } from '../../models/trainers.model';

@Component({
  selector: 'app-trainer-card',
  standalone: true,
  imports: [],
  templateUrl: './trainer-card.component.html',
  styleUrl: './trainer-card.component.scss',
})
export class TrainerCardComponent {
  trainer = input.required<Trainer>();
}

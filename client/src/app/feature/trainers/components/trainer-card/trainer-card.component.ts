import { Component, inject, input } from '@angular/core';
import { Trainer } from '../../models/trainers.model';
import { TrainersService } from '../../../../core/services/trainers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-card',
  standalone: true,
  imports: [],
  templateUrl: './trainer-card.component.html',
  styleUrl: './trainer-card.component.scss',
})
export class TrainerCardComponent {
  private trainersService = inject(TrainersService);
  private router = inject(Router);
  trainer = input.required<Trainer>();

  onTrainerNavigate(route: 'edit' | 'delete') {
    if (route === 'delete') {
      this.trainersService.removeTrainer(this.trainer().id);
      window.location.reload();
    }

    if (route === 'edit') {
      this.router.navigate([`edit-trainer/${this.trainer().id}`]);
    }
  }
}

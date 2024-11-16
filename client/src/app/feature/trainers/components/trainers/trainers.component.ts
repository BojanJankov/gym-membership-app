import { Component, inject, OnInit } from '@angular/core';
import { TrainersService } from '../../../../core/services/trainers.service';
import { TrainerCardComponent } from '../trainer-card/trainer-card.component';
import { AdminPanelComponent } from '../../../../shared/admin-panel/admin-panel.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [TrainerCardComponent, AdminPanelComponent],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.scss',
})
export class TrainersComponent implements OnInit {
  private trainersService = inject(TrainersService);
  private router = inject(Router);

  trainers = this.trainersService.trainers;
  currentUser = inject(AuthService).currentUser;

  ngOnInit() {
    this.trainersService.getAllTrainers();
    console.log(this.trainers());
  }

  onAddTrainerClick() {
    this.router.navigate(['add-trainer']);
  }
}

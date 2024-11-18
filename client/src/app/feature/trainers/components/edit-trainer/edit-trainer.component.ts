import { Component, effect, inject } from '@angular/core';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { TrainersService } from '../../../../core/services/trainers.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerReq } from '../../models/trainers.model';

@Component({
  selector: 'app-edit-trainer',
  standalone: true,
  imports: [TrainerFormComponent],
  templateUrl: './edit-trainer.component.html',
  styleUrl: './edit-trainer.component.scss',
})
export class EditTrainerComponent {
  private trainerService = inject(TrainersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentUser = inject(AuthService).currentUser;
  selectedTrainer = this.trainerService.selectedTrainer;

  constructor() {
    effect(() => {
      if (!this.selectedTrainer()) return;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedTrainer()) {
      this.trainerService.getTrainerById(id);
    }
  }

  onEditTrainer(editTrainerData: TrainerReq) {
    this.trainerService.updateTrainer(
      this.selectedTrainer().id,
      editTrainerData
    );
    this.router.navigate(['trainers']);
  }
}

import { Component, inject, input, output } from '@angular/core';
import { Plan } from '../../models/plans.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PlansService } from '../../../../core/services/plans.service';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss',
})
export class PlanCardComponent {
  private router = inject(Router);
  private planService = inject(PlansService);

  currentUser = inject(AuthService).currentUser;
  deletePlanOutput = output<number>();
  plan = input.required<Plan>();

  onPlanNavigate(route: 'delete' | 'edit') {
    if (route === 'delete') {
      this.planService.deletePlan(this.plan().id);
      window.location.reload();
    }

    if (route === 'edit') {
      this.router.navigate([`edit-plan/${this.plan().id}`]);
    }
  }
}

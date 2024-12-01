import { Component, inject } from '@angular/core';
import { PlanFormComponent } from '../plan-form/plan-form.component';
import { PlanReq } from '../../models/plans.model';
import { PlansService } from '../../../../core/services/plans.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [PlanFormComponent],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.scss',
})
export class AddPlanComponent {
  private planService = inject(PlansService);

  onAddOutput(planData: PlanReq) {
    this.planService.createPlan(planData);
  }
}

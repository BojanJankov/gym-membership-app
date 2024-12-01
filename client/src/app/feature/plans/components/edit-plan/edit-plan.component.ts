import { Component, effect, inject } from '@angular/core';
import { PlanFormComponent } from '../plan-form/plan-form.component';
import { PlanReq } from '../../models/plans.model';
import { PlansService } from '../../../../core/services/plans.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-edit-plan',
  standalone: true,
  imports: [PlanFormComponent],
  templateUrl: './edit-plan.component.html',
  styleUrl: './edit-plan.component.scss',
})
export class EditPlanComponent {
  private planService = inject(PlansService);
  private route = inject(ActivatedRoute);

  currentUser = inject(AuthService).currentUser;
  selectedPlan = this.planService.selectedPlan;

  onEditOutput(editData: PlanReq) {
    this.planService.updatePlan(this.selectedPlan().id, editData);
  }

  constructor() {
    effect(() => {
      if (!this.selectedPlan()) return;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedPlan()) {
      this.planService.getPlanById(id);
    }
  }
}

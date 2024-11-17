import { inject, Injectable, signal } from '@angular/core';
import { PlansApiService } from './plans-api.service';
import { Plan, PlanReq } from '../../feature/plans/models/plans.model';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private apiService = inject(PlansApiService);

  plans = signal<Plan[]>([]);
  selectedPlan = signal<Plan>(null);

  getAllPlans() {
    this.apiService.fetchAllPlans().subscribe({
      next: (response) => {
        this.plans.set(response);
      },
      error: (error) => console.log(error),
    });
  }

  getPlanById(planId: number) {
    this.apiService.fetchPlanById(planId).subscribe({
      next: (response) => {
        this.selectedPlan.set(response);
      },
      error: (error) => console.log(error),
    });
  }

  createPlan(planReq: PlanReq) {
    this.apiService.postPlan(planReq).subscribe({
      next: () => {
        console.log('Plan was created!');
      },
      error: (error) => console.log(error),
    });
  }

  updatePlan(planId: number, planReq: PlanReq) {
    this.apiService.patchPlan(planId, planReq).subscribe({
      next: () => {
        console.log('Plan was updated!');
      },
      error: (error) => console.log(error),
    });
  }

  deletePlan(planId: number) {
    this.apiService.deletePlan(planId).subscribe({
      next: () => {
        console.log('Plan was deleted!');
      },
      error: (error) => console.log(error),
    });
  }
}

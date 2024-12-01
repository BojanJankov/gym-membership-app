import { inject, Injectable, signal } from '@angular/core';
import { PlansApiService } from './plans-api.service';
import { Plan, PlanReq } from '../../feature/plans/models/plans.model';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private apiService = inject(PlansApiService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

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
        this.router.navigate(['plans']);
        this.notificationService.showToast('Successfully created plan!', true);
      },
      error: (error) =>
        this.notificationService.showToast(error.error.message, false),
    });
  }

  updatePlan(planId: number, planReq: PlanReq) {
    this.apiService.patchPlan(planId, planReq).subscribe({
      next: () => {
        this.router.navigate(['plans']);
        this.notificationService.showToast('Successfully updated plan!', true);
      },
      error: (error) =>
        this.notificationService.showToast(error.error.message, false),
    });
  }

  deletePlan(planId: number) {
    this.apiService.deletePlan(planId).subscribe({
      next: () => {
        this.notificationService.showToast('Successfully deleted plan!', true);
      },
      error: (error) => {
        this.notificationService.showToast(error.error.message, false);
      },
    });
  }
}

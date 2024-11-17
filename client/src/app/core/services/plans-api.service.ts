import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants/core.constants';
import { Plan, PlanReq } from '../../feature/plans/models/plans.model';

@Injectable({
  providedIn: 'root',
})
export class PlansApiService {
  private http = inject(HttpClient);

  fetchAllPlans() {
    return this.http.get<Plan[]>(`${BASE_URL}/plans`);
  }

  fetchPlanById(planId: number) {
    return this.http.get<Plan>(`${BASE_URL}/plans/${planId}`);
  }

  postPlan(planReq: PlanReq) {
    return this.http.post(`${BASE_URL}/plans`, planReq);
  }

  patchPlan(planId: number, planReq: PlanReq) {
    return this.http.patch(`${BASE_URL}/plans/${planId}`, planReq);
  }

  deletePlan(planId: number) {
    return this.http.delete(`${BASE_URL}/plans/${planId}`);
  }
}

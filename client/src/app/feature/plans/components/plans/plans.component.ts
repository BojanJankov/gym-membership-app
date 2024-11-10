import { Component, inject, OnInit } from '@angular/core';
import { PlansService } from '../../../../core/services/plans.service';
import { PlanCardComponent } from '../plan-card/plan-card.component';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [PlanCardComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit {
  private plansService = inject(PlansService);

  plans = this.plansService.plans;

  ngOnInit(): void {
    this.plansService.getAllPlans();
  }
}

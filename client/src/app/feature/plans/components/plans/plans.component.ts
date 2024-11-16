import { Component, inject, OnInit } from '@angular/core';
import { PlansService } from '../../../../core/services/plans.service';
import { PlanCardComponent } from '../plan-card/plan-card.component';
import { AdminPanelComponent } from '../../../../shared/admin-panel/admin-panel.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [PlanCardComponent, AdminPanelComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit {
  private plansService = inject(PlansService);
  private router = inject(Router);

  plans = this.plansService.plans;
  currentUser = inject(AuthService).currentUser;

  ngOnInit(): void {
    this.plansService.getAllPlans();
  }

  onAddPLanClick() {
    this.router.navigate(['add-plan']);
  }
}

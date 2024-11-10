import { Component, input } from '@angular/core';
import { Plan } from '../../models/plans.model';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss',
})
export class PlanCardComponent {
  plan = input.required<Plan>();
}

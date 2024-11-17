import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Plan, PlanReq } from '../../models/plans.model';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-plan-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss',
})
export class PlanFormComponent {
  currentUser = inject(AuthService).currentUser;
  editPlanData = input<Plan>();
  planForm = this.generatePlanForm();
  isSubbmited = signal<boolean>(false);
  subbmitOutput = output<PlanReq>();

  generatePlanForm() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      fee: new FormControl<number>(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
    effect(() => {
      if (this.editPlanData()) {
        const editData: PlanReq = {
          name: this.editPlanData().name,
          fee: this.editPlanData().fee,
          description: this.editPlanData().description,
        };
        this.populateForm(editData);
      }
    });
  }

  populateForm(plan: PlanReq) {
    this.planForm.setValue({
      name: plan.name,
      fee: plan.fee,
      description: plan.description,
    });
  }

  onFormSubbmit() {
    this.planForm.markAllAsTouched();

    if (this.planForm.invalid) return;

    const createPlanData: PlanReq = {
      name: this.planForm.get('name').value,
      fee: this.planForm.get('fee').value,
      description: this.planForm.get('description').value,
    };

    this.subbmitOutput.emit(createPlanData);
  }
}

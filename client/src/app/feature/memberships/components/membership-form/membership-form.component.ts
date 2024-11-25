import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Membership, MembershipReq } from '../../models/memberships.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlansService } from '../../../../core/services/plans.service';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonComponent],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.scss',
})
export class MembershipFormComponent implements OnInit {
  private plansService = inject(PlansService);
  private authService = inject(AuthService);
  plans = this.plansService.plans;
  users = this.authService.users;
  currentUser = inject(AuthService).currentUser;
  editMembershipData = input<Membership>();
  membershipForm = this.generateMembershipForm();
  isSubbmited = signal<boolean>(false);
  subbmitOutput = output<MembershipReq>();
  searchValue = model<string>('');

  constructor() {
    effect(() => {
      if (this.editMembershipData()) {
        const editData: MembershipReq = {
          startDate: this.editMembershipData().startDate,
          expireDate: this.editMembershipData().expireDate,
          paymentStatus: this.editMembershipData().paymentStatus,
          userId: this.editMembershipData().user.id,
          planId: this.editMembershipData().plan.id,
        };
        this.populateForm(editData);
      }
    });
  }

  ngOnInit(): void {
    this.authService.getAllUsers();
    this.plansService.getAllPlans();
  }

  generateMembershipForm() {
    return new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      expireDate: new FormControl('', [Validators.required]),
      paymentStatus: new FormControl<'PAID' | 'PENDING'>('PAID', [
        Validators.required,
      ]),
      planId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
    });
  }

  populateForm(membership: MembershipReq) {
    this.membershipForm.setValue({
      startDate: membership.startDate,
      expireDate: membership.expireDate,
      paymentStatus: membership.paymentStatus,
      planId: String(membership.planId),
      userId: membership.userId,
    });
  }

  onFormSubbmit() {
    this.membershipForm.markAllAsTouched();
    this.isSubbmited.set(true);

    if (this.membershipForm.invalid) return;

    const membershipData: MembershipReq = {
      startDate: this.membershipForm.get('startDate').value,
      expireDate: this.membershipForm.get('expireDate').value,
      paymentStatus: this.membershipForm.get('paymentStatus').value,
      userId: this.membershipForm.get('userId').value,
      planId: Number(this.membershipForm.get('planId').value),
    };

    this.subbmitOutput.emit(membershipData);
  }
}

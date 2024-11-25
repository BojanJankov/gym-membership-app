import { Component, inject } from '@angular/core';
import { MembershipFormComponent } from '../membership-form/membership-form.component';
import { MembershipReq } from '../../models/memberships.model';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-membership',
  standalone: true,
  imports: [MembershipFormComponent],
  templateUrl: './add-membership.component.html',
  styleUrl: './add-membership.component.scss',
})
export class AddMembershipComponent {
  private membershipService = inject(MembershipsService);
  private router = inject(Router);

  onAddMembership(membershipAddData: MembershipReq) {
    this.membershipService.createMembership(membershipAddData);
    this.membershipService.allMemberships.set([]);
    this.router.navigate(['admin-memberships']);
  }
}

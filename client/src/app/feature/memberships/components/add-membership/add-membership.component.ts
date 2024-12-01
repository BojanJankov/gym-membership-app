import { Component, inject, OnInit, signal } from '@angular/core';
import { MembershipFormComponent } from '../membership-form/membership-form.component';
import { MembershipReq } from '../../models/memberships.model';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/models/auth.model';

@Component({
  selector: 'app-add-membership',
  standalone: true,
  imports: [MembershipFormComponent],
  templateUrl: './add-membership.component.html',
  styleUrl: './add-membership.component.scss',
})
export class AddMembershipComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private membershipService = inject(MembershipsService);
  private router = inject(Router);

  selectedUserId = signal<string>('');

  onAddMembership(membershipAddData: MembershipReq) {
    this.membershipService.createMembership(membershipAddData);
    this.router.navigate([`user-details/${this.selectedUserId()}`]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    if (!this.selectedUserId()) {
      this.selectedUserId.set(id);
    }
  }
}

import { Component, effect, inject, OnInit } from '@angular/core';
import { MembershipFormComponent } from '../membership-form/membership-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { MembershipReq } from '../../models/memberships.model';

@Component({
  selector: 'app-edit-membership',
  standalone: true,
  imports: [MembershipFormComponent],
  templateUrl: './edit-membership.component.html',
  styleUrl: './edit-membership.component.scss',
})
export class EditMembershipComponent implements OnInit {
  private membershipService = inject(MembershipsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentUser = inject(AuthService).currentUser;
  selectedMembership = this.membershipService.selectedMembership;

  constructor() {
    effect(() => {
      if (!this.selectedMembership()) return;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedMembership()) {
      this.membershipService.getMembershipById(id);
    }
  }

  onEditMembership(editMembershipData: MembershipReq) {
    this.membershipService.updateMembership(
      this.selectedMembership().id,
      editMembershipData
    );
    this.membershipService.userMemberships.set([]);
    this.router.navigate([`user-details/${this.selectedMembership().user.id}`]);
  }
}

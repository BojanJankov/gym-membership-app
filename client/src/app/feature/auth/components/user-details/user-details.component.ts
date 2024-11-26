import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private membershipsService = inject(MembershipsService);

  selectedUser = this.authService.selectedUser;
  memberships = this.membershipsService.userMemberships;

  constructor() {
    effect(() => {
      if (!this.selectedUser()) return;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.authService.selectedUser.set(null);
    this.authService.getSelectedUser(id);

    this.membershipsService.getMembershipByUser(id);
  }

  onAddMembership() {
    this.router.navigate([`add-membership/user/${this.selectedUser().id}`]);
  }

  onEditMembership(membershipId: number) {
    this.router.navigate([`edit-membership/${membershipId}`]);
  }

  onDeleteMembership(membershipId: number) {
    this.membershipsService.deleteMembership(membershipId);
    setTimeout(() => {
      location.reload();
    }, 300);
  }
}

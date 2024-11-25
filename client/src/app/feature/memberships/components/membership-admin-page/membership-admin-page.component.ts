import { Component, inject, model } from '@angular/core';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../core/pipes/search.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership-admin-page',
  standalone: true,
  imports: [DatePipe, ButtonComponent, FormsModule, SearchPipe],
  templateUrl: './membership-admin-page.component.html',
  styleUrl: './membership-admin-page.component.scss',
})
export class MembershipAdminPageComponent {
  private membershipsService = inject(MembershipsService);
  private router = inject(Router);

  searchValue = model<string>('');

  memberships = this.membershipsService.allMemberships;

  ngOnInit(): void {
    this.membershipsService.getAllMemberships();
  }

  onAddMembershipNavigate() {
    this.router.navigate(['add-membership']);
  }

  onEditMembership(membershipId: number) {
    this.router.navigate([`edit-membership/${membershipId}`]);
  }

  onDeleteMembership(membershipId: number) {
    this.membershipsService.deleteMembership(membershipId);
    location.reload();
  }
}

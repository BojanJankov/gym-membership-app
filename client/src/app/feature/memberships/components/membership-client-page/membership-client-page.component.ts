import { Component, inject, OnInit } from '@angular/core';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-membership-client-page',
  standalone: true,
  imports: [DatePipe, DatePipe],
  templateUrl: './membership-client-page.component.html',
  styleUrl: './membership-client-page.component.scss',
})
export class MembershipClientPageComponent implements OnInit {
  private membershipsService = inject(MembershipsService);
  currentUser = inject(AuthService).currentUser;

  memberships = this.membershipsService.userMemberships;

  today = new Date();

  ngOnInit(): void {
    this.membershipsService.getMembershipByUser(this.currentUser().id);
    console.log(this.memberships());
    console.log(this.today);
  }
}

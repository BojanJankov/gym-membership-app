import { Component, inject, model } from '@angular/core';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../core/pipes/search.pipe';

@Component({
  selector: 'app-membership-admin-page',
  standalone: true,
  imports: [DatePipe, ButtonComponent, FormsModule, SearchPipe],
  templateUrl: './membership-admin-page.component.html',
  styleUrl: './membership-admin-page.component.scss',
})
export class MembershipAdminPageComponent {
  private membershipsService = inject(MembershipsService);

  searchValue = model<string>('');

  memberships = this.membershipsService.allMemberships;

  ngOnInit(): void {
    this.membershipsService.getAllMemberships();
  }
}

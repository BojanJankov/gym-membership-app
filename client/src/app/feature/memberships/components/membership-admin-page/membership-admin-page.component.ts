import { Component, inject, model } from '@angular/core';
import { MembershipsService } from '../../../../core/services/memberships.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../core/pipes/search.pipe';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-membership-admin-page',
  standalone: true,
  imports: [ButtonComponent, FormsModule, SearchPipe],
  templateUrl: './membership-admin-page.component.html',
  styleUrl: './membership-admin-page.component.scss',
})
export class MembershipAdminPageComponent {
  private membershipsService = inject(MembershipsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  searchValue = model<string>('');

  memberships = this.membershipsService.allMemberships;
  users = this.authService.users;

  ngOnInit(): void {
    this.authService.getAllUsers();
    this.membershipsService.getAllMemberships();
  }

  onAddUser() {
    this.router.navigate(['add-user']);
  }

  onUserRowClick(userId: string) {
    this.router.navigate([`user-details/${userId}`]);
  }
}

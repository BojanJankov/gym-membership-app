import { inject, Injectable, signal } from '@angular/core';
import { MembershipsApiService } from './memberships-api.service';
import { Membership } from '../../feature/memberships/models/memberships.model';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService {
  private apiService = inject(MembershipsApiService);

  userMemberships = signal<Membership[]>([]);

  getMembershipByUser(userId: string) {
    this.apiService.getMembershipByUser(userId).subscribe({
      next: (response) => {
        console.log(response);
        this.userMemberships.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

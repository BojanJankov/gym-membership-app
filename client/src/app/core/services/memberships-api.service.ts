import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Membership } from '../../feature/memberships/models/memberships.model';
import { BASE_URL } from '../constants/core.constants';

@Injectable({
  providedIn: 'root',
})
export class MembershipsApiService {
  private http = inject(HttpClient);

  getAllMemberships() {
    return this.http.get<Membership[]>(`${BASE_URL}/memberships`);
  }

  getMembershipByUser(userId: string) {
    return this.http.get<Membership[]>(
      `${BASE_URL}/memberships/user/${userId}`
    );
  }
}

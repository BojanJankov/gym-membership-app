import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Membership,
  MembershipReq,
} from '../../feature/memberships/models/memberships.model';
import { BASE_URL } from '../constants/core.constants';

@Injectable({
  providedIn: 'root',
})
export class MembershipsApiService {
  private http = inject(HttpClient);

  getAllMemberships() {
    return this.http.get<Membership[]>(`${BASE_URL}/memberships`);
  }

  getMembershipById(membershipId: number) {
    return this.http.get<Membership>(`${BASE_URL}/memberships/${membershipId}`);
  }

  getMembershipByUser(userId: string) {
    return this.http.get<Membership[]>(
      `${BASE_URL}/memberships/user/${userId}`
    );
  }

  postMembership(membershipData: MembershipReq) {
    return this.http.post(`${BASE_URL}/memberships`, membershipData);
  }

  patchMembership(membershipId: number, membershipData: MembershipReq) {
    return this.http.patch(
      `${BASE_URL}/memberships/${membershipId}`,
      membershipData
    );
  }

  removeMembership(membershipId: number) {
    return this.http.delete(`${BASE_URL}/memberships/${membershipId}`);
  }
}

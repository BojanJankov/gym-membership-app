import { inject, Injectable, signal } from '@angular/core';
import { MembershipsApiService } from './memberships-api.service';
import {
  Membership,
  MembershipReq,
} from '../../feature/memberships/models/memberships.model';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService {
  private apiService = inject(MembershipsApiService);

  allMemberships = signal<Membership[]>([]);
  userMemberships = signal<Membership[]>([]);
  selectedMembership = signal<Membership>(null);

  getAllMemberships() {
    this.apiService.getAllMemberships().subscribe({
      next: (response) => {
        this.allMemberships.set([]);
        this.allMemberships.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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

  getMembershipById(memebrshipId: number) {
    this.apiService.getMembershipById(memebrshipId).subscribe({
      next: (response) => {
        console.log(response);
        this.selectedMembership.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createMembership(membershipData: MembershipReq) {
    this.apiService.postMembership(membershipData).subscribe({
      next: () => {
        console.log('Membership was created!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateMembership(membershipId: number, membershipData: MembershipReq) {
    this.apiService.patchMembership(membershipId, membershipData).subscribe({
      next: () => {
        console.log('Membership was edited!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteMembership(membershipId: number) {
    this.apiService.removeMembership(membershipId).subscribe({
      next: () => {
        console.log('Membership was deleted!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

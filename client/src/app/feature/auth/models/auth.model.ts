import { Membership } from '../../memberships/models/memberships.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
  role: string;
  userDetails: UserDetails;
  memberships: Membership[];
}

export interface UpdateUserReq {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface UserDetails {
  id: string;
  phoneNumber: number;
  age: number;
  profilePhoto: string;
  dateOfBirth: string;
  gender: string;
  city: string;
  country: string;
  userId: string;
}

export interface CreateUserDetailsReq {
  phoneNumber: number;
  age: number;
  dateOfBirth: string;
  gender: string;
  city: string;
  country: string;
}

export interface UpdateUserDetailsReq {
  phoneNumber?: number;
  age?: number;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  country?: string;
}

export interface UserCredentails {
  email: string;
  password: string;
}

export interface RegisterReq {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdatePasswordReq {
  newPassword: string;
}

export interface PorfilePhotoReq {
  profilePhoto: string;
}

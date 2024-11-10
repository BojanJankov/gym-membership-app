export interface Trainer {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  age: number;
  expirience: number;
  phoneNumber: string;
  email: string;
}

export interface TrainerReq {
  firstName: string;
  lastName: string;
  photo: string;
  age: number;
  expirience: number;
  phoneNumber: string;
  email: string;
}

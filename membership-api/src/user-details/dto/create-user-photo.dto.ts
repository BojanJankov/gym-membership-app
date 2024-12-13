import { IsString } from 'class-validator';

export class CreateUserPhotoDto {
  @IsString()
  profilePhoto: string;
}

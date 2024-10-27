import {
  IsEmail,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsString()
  photo: string;

  @IsNumber()
  @Min(0)
  @Max(75)
  age: number;

  @IsNumber()
  @Min(0)
  expirience: number;

  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @IsEmail()
  email: string;
}

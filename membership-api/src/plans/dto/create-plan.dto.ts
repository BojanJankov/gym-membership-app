import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNumber()
  @Min(0)
  fee: number;

  @IsString()
  @MinLength(50)
  @MaxLength(250)
  description: string;
}

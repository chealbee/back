import { IsEmail, IsString, Length, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString()
  readonly value: string;
  @IsNumber()
  readonly userID: number;
}

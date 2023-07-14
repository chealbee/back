import { IsEmail, IsString, Length, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'role must be string' })
  readonly value: string;

  @IsNumber({}, { message: 'role must be number' })
  readonly userID: number;
}

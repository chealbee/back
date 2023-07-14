import { IsString } from 'class-validator';

export class RolesDto {
  @IsString({ message: 'value must be sting' })
  value: string;

  @IsString({ message: 'description must be sting' })
  description: string;
}

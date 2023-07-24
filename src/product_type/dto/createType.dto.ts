import { IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString({ message: 'name must be string' })
  readonly name: string;
}

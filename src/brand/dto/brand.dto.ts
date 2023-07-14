import { IsString, Length } from 'class-validator';

export class BrandDto {
  @IsString({ message: 'name must be string' })
  @Length(1, 100, { message: 'min length 1 max 100' })
  readonly name: string;
}

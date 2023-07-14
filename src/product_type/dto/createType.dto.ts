import { IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString({ message: 'name must be string' })
  readonly name: string;
  @IsNumber({}, { message: 'brand id must be number' })
  readonly brandId: number;
}

import { IsNumber } from 'class-validator';

export class GetAllProductDto {
  @IsNumber({}, { message: 'typeId must be number' })
  typeId: number;
  @IsNumber({}, { message: 'brandId must be number' })
  brandId: number;
  @IsNumber({}, { message: 'limit must be number' })
  limit: number;
  @IsNumber({}, { message: 'page must be number' })
  page: number;
}

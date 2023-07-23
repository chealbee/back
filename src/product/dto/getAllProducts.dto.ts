import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAllProductDto {
  @IsOptional()
  @IsArray({ message: 'typeId must be number' })
  typeId?: number[];

  @IsOptional()
  @IsArray({ message: 'brandId must be array' })
  brandId?: number[];

  @IsNumber({}, { message: 'limit must be number' })
  limit: number;

  @IsNumber({}, { message: 'page must be number' })
  page: number;

  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsOptional()
  @IsArray({ message: 'price must be number array' })
  price: number[];

  @IsOptional()
  @IsString({ message: 'order must be number string' })
  order: string | null;
}

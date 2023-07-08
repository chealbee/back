import { Controller } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';

@Controller('product-info')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) {}
}

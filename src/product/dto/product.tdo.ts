import { ProductInfo } from 'src/product_info/models/product-info.model';

export class ProductDto {
  name: string;
  price: number;
  img: string;
  description: string;
  productTypeId: number;
  productBrandId: number;
  info: ProductInfo[];
}

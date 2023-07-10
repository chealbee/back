import { BasketProducts } from 'src/basket/models/basket-prod.model';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { ProductRating } from 'src/rating/models/rating.model';

export class ProductDto {
  name: string;
  price: number;
  img: string;
  productTypeId: number;
  productBrandId: number;
  info: ProductInfo[];

  //   type: ProductType;
  //   productBrandId: number;
  //   brand: ProductBrand;
  //   rating: ProductRating[];
  //   info: ProductInfo[];
  //   baskets: BasketProducts[];
}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductRating } from 'src/rating/models/rating.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { BasketProducts } from 'src/basket/models/basket-prod.model';
import { TypeBrand } from './models/brand-type.model';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductType,
      ProductBrand,
      ProductRating,
      ProductInfo,
      BasketProducts,
      TypeBrand,
    ]),
    ImagesModule,
    AuthModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}

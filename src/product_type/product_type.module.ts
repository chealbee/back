import { Module } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { ProductTypeController } from './product_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeBrand } from 'src/product/models/brand-type.model';
import { ProductBrand } from 'src/brand/models/brand.model';
import { Product } from 'src/product/models/product.model';
import { ProductType } from './model/product_type.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  imports: [
    SequelizeModule.forFeature([Product, ProductBrand, TypeBrand, ProductType]),
    AuthModule,
  ],
})
export class ProductTypeModule {}

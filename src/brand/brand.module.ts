import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductBrand } from './models/brand.model';
import { Product } from 'src/product/models/product.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { TypeBrand } from 'src/product/models/brand-type.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    SequelizeModule.forFeature([ProductBrand, Product, ProductType, TypeBrand]),
    AuthModule,
  ],
})
export class BrandModule {}

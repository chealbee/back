import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/models/product.model';
import { ProductInfo } from './models/product-info.model';

@Module({
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
  imports: [SequelizeModule.forFeature([Product, ProductInfo])],
})
export class ProductInfoModule {}

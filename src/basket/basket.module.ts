import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketProducts } from './models/basket-prod.model';
import { User } from 'src/user/models/user.model';
import { Basket } from './models/basket.model';
import { Product } from 'src/product/models/product.model';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    SequelizeModule.forFeature([Basket, User, BasketProducts, Basket, Product]),
  ],
})
export class BasketModule {}

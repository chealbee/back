import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketProducts } from './models/basket-prod.model';
import { User } from 'src/user/models/user.model';
import { Basket } from './models/basket.model';
import { Product } from 'src/product/models/product.model';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    SequelizeModule.forFeature([Basket, User, BasketProducts, Basket, Product]),
    ProductModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.PRVATE_KEY || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class BasketModule {}

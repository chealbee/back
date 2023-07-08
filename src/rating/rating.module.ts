import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { Product } from 'src/product/models/product.model';
import { ProductRating } from './models/rating.model';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [SequelizeModule.forFeature([User, Product, ProductRating])],
})
export class RatingModule {}

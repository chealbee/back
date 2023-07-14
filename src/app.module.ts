import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user-roles.model';
import { BasketModule } from './basket/basket.module';
import { RatingModule } from './rating/rating.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { ProductInfoModule } from './product_info/product_info.module';
import { ProductTypeModule } from './product_type/product_type.module';
import { ProductRating } from './rating/models/rating.model';
import { ProductType } from './product_type/model/product_type.model';
import { ProductInfo } from './product_info/models/product-info.model';
import { Product } from './product/models/product.model';
import { TypeBrand } from './product/models/brand-type.model';
import { ProductBrand } from './brand/models/brand.model';
import { Basket } from './basket/models/basket.model';
import { BasketProducts } from './basket/models/basket-prod.model';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRESS_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        ProductRating,
        ProductType,
        ProductInfo,
        Product,
        TypeBrand,
        ProductBrand,
        Basket,
        BasketProducts,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    RolesModule,
    BasketModule,
    RatingModule,
    BrandModule,
    ProductModule,
    ProductInfoModule,
    ProductTypeModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

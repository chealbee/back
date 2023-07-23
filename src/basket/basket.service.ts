import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { BasketProducts } from './models/basket-prod.model';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/models/product.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketModel: typeof Basket,
    @InjectModel(BasketProducts)
    private basketProdyctsModel: typeof BasketProducts,
    private productService: ProductService,
    private jwtService: JwtService,
  ) {}

  async getBasket(id: string, body: { token: string }) {
    const user = await this.jwtService.verify<{
      email: string;
      id: number;
    }>(body.token);
    if (user.id === +id) {
      return this.basketModel.findOne({
        where: { userId: id },
        include: [
          {
            model: BasketProducts,
            include: [{ model: Product, include: [{ all: true }] }],
          },
        ],
      });
    }
  }

  async addProductToBasket(body: { userId: number; productId: number }) {
    const basket = await this.basketModel.findOne({
      where: { userId: body.userId },
    });

    const basketProdyct = await this.basketProdyctsModel.create({
      userId: body.userId,
      productId: body.productId,
    });

    basket.$add('basketProducts', [basketProdyct.id]);
    basket.basketProducts = [basketProdyct];

    return basketProdyct;
  }

  async cleanBasket(token: string) {
    const user = this.jwtService.verify<{
      email: string;
      id: number;
    }>(token);

    if (user.id) {
      const basket = await this.basketModel.findOne({
        where: { userId: user.id },
      });
      if (basket) {
        return this.basketProdyctsModel.destroy({ where: { userId: user.id } });
      }
    }
  }

  async deletformBasket(token: string, productId: number) {
    const user = this.jwtService.verify<{
      email: string;
      id: number;
    }>(token);

    if (user.id) {
      const basket = await this.basketModel.findOne({
        where: { userId: user.id },
      });
      const product = await this.productService.getOne(productId);

      if (basket && product) {
        return this.basketProdyctsModel.destroy({
          where: { userId: user.id, productId: product.id },
        });
      }
    }
  }
}

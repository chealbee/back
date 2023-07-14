import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { BasketProducts } from './models/basket-prod.model';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketModel: typeof Basket,
    @InjectModel(BasketProducts)
    private basketProdyctsModel: typeof BasketProducts,
    private productService: ProductService,
  ) {}

  getBasket(id: string) {
    return this.basketModel.findOne({
      where: { userId: id },
      include: { model: BasketProducts },
    });
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
}

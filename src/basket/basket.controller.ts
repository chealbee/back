import { Body, Controller, Get } from '@nestjs/common';
import { Basket } from './models/basket.model';
import { InjectModel } from '@nestjs/sequelize';

@Controller('basket')
export class BasketController {
  constructor(@InjectModel(Basket) private basketModel: typeof Basket) {}

  addToBasket() {}

  deleteaFromToBasket() {}

  @Get()
  getBasket(@Body() body) {
    return body;
  }
}

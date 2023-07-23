import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidationPipe } from 'src/pipes/pipes.pipe';
import { RolesAuth } from 'src/auth/roles-auth.decorator';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post()
  @RolesAuth('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  addToBasket(@Body() body: { userId: number; productId: number }) {
    return this.basketService.addProductToBasket(body);
  }

  @Post(':id')
  getBasket(@Param('id') id: string, @Body() body: { token: string }) {
    return this.basketService.getBasket(id, body);
  }

  @Delete()
  @RolesAuth('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  clenVasket(@Body() body: { token: string }) {
    return this.basketService.cleanBasket(body.token);
  }

  @Delete('deleteProduct')
  @RolesAuth('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  deleteFromBasket(@Body() body: { token: string; productId: number }) {
    return this.basketService.deletformBasket(body.token, body.productId);
  }
}

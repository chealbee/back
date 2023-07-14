import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  UseGuards,
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

  @Get(':id')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  getBasket(@Param('id') id: string) {
    return this.basketService.getBasket(id);
  }
}

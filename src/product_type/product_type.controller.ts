import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProductType } from './model/product_type.model';
import { CreateTypeDto } from './dto/createType.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAuth } from 'src/auth/roles-auth.decorator';
import { ValidationPipe } from 'src/pipes/pipes.pipe';

@Controller('producttype')
export class ProductTypeController {
  constructor(
    @InjectModel(ProductType) private productType: typeof ProductType,
  ) {}

  @Post()
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateTypeDto) {
    const { name } = body;
    const type = await this.productType.create({ name });
    return type;
  }

  @Delete('delete/:id')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: number) {
    await this.productType.destroy({ where: { id: id } });
    return `product type with id=${id} delete`;
  }

  @Get()
  async getAll() {
    //  const types = await this.productType.findAll({ include: { all: true } });
    const types = await this.productType.findAll();
    return types;
  }
}

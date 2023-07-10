import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { ProductType } from './model/product_type.model';
import { CreateTypeDto } from './dto/createType.dto';
import { InjectModel } from '@nestjs/sequelize';

@Controller('producttype')
export class ProductTypeController {
  constructor(
    @InjectModel(ProductType) private productType: typeof ProductType,
  ) {}

  @Post()
  async create(@Body() body: CreateTypeDto) {
    const { name } = body;
    const type = await this.productType.create({ name });
    return type;
  }

  @Delete('delete')
  async delete(@Param('id') id: number) {
    await this.productType.destroy({ where: { id: id } });
    return JSON.stringify(`product type with id=${id} delete`);
  }

  @Get()
  async getAll() {
    const types = await this.productType.findAll();
    return types;
  }
}

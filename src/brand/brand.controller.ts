import { Controller, Get, Delete, Post, Body, Param } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { ProductBrand } from './models/brand.model';
import { InjectModel } from '@nestjs/sequelize';

@Controller('brand')
export class BrandController {
  constructor(@InjectModel(ProductBrand) private brand: typeof ProductBrand) {}

  @Post()
  async create(@Body() body: BrandDto) {
    const { name } = body;
    const type = await this.brand.create({ name });
    return type;
  }

  @Delete('delete/:id')
  async delete(@Param('id') id) {
    await this.brand.destroy({ where: { id: id } });
    return JSON.stringify(`product brand with id:${id} delete`);
  }

  @Get()
  async getAll() {
    const types = await this.brand.findAll();
    return types;
  }
}

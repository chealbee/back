import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  Param,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { ProductBrand } from './models/brand.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesAuth } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidationPipe } from 'src/pipes/pipes.pipe';

@Controller('brand')
export class BrandController {
  constructor(@InjectModel(ProductBrand) private brand: typeof ProductBrand) {}

  @Post()
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() body: BrandDto) {
    const { name } = body;
    const type = await this.brand.create({ name });
    return type;
  }

  @Delete('delete/:id')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
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

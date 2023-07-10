import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.tdo';
import { Product } from './models/product.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { InjectModel } from '@nestjs/sequelize';

@Controller('product')
export class ProductController {
  constructor(
    @InjectModel(Product) private product: typeof Product,
    @InjectModel(ProductInfo) private productInfo: typeof ProductInfo,
  ) {}

  @Post()
  async createProduct(@Body() body: ProductDto) {
    const { name, price, img, productTypeId, productBrandId } = body;
    const device = await Product.create({
      name,
      price,
      img,
      productBrandId,
      productTypeId,
    });

    if (body.info) {
      body.info.forEach((info) => {
        ProductInfo.create({
          description: info.description,
          productId: device.id,
          title: info.title,
        });
      });
    }
    return JSON.stringify(device);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.product.destroy({ where: { id } });
    this.productInfo.destroy({ where: { productId: id } });
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const product = await this.product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }],
    });
    return product;
  }

  @Get()
  async getAll(
    @Body()
    body: {
      typeId: number;
      brandId: number;
      limit: number;
      page: number;
      info: ProductInfo[];
    },
  ) {
    let devices;
    const { typeId, brandId } = body;

    const page = body.page || 1;
    const limit = body.limit || 10;
    const offset = page * limit - limit;

    if (!typeId && !brandId) {
      devices = await this.product.findAndCountAll({ limit, offset });
    }
    if (!typeId && brandId) {
      devices = await this.product.findAndCountAll({
        where: { productBrandId: brandId },
        limit,
        offset,
      });
    }
    if (typeId && !brandId) {
      devices = await this.product.findAndCountAll({
        where: { productTypeId: typeId },
        limit,
        offset,
      });
    }
    if (typeId && brandId) {
      devices = await this.product.findAndCountAll({
        where: { productTypeId: typeId, productBrandId: brandId },
        limit,
        offset,
      });
    }
    return devices;
  }
}

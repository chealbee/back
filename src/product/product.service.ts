import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './dto/product.tdo';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { GetAllProductDto } from './dto/getAllProducts.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private product: typeof Product,
    @InjectModel(ProductInfo) private productInfo: typeof ProductInfo,
    private imageService: ImagesService,
  ) {}

  getOne(id: number) {
    return this.product.findOne({
      where: { id },
      include: [
        { model: ProductBrand },
        { model: ProductType },
        { model: ProductInfo, as: 'info' },
      ],
    });
  }

  getAll(product: GetAllProductDto) {
    const { typeId, brandId } = product;
    const page = product.page || 1;
    const limit = product.limit || 10;
    const offset = page * limit - limit;

    if (!typeId && !brandId) {
      return this.product.findAndCountAll({ limit, offset });
    }
    if (!typeId && brandId) {
      return this.product.findAndCountAll({
        where: { productBrandId: brandId },
        limit,
        offset,
      });
    }
    if (typeId && !brandId) {
      return this.product.findAndCountAll({
        where: { productTypeId: typeId },
        limit,
        offset,
      });
    }
    if (typeId && brandId) {
      return this.product.findAndCountAll({
        where: { productTypeId: typeId, productBrandId: brandId },
        limit,
        offset,
      });
    }
  }

  delete(id: number) {
    this.product.destroy({ where: { id } });
    this.productInfo.destroy({ where: { productId: id } });
  }

  async createProduct(body: ProductDto, image: Express.Multer.File) {
    const fileName = await this.imageService.createFile(image);

    const device = await this.product.create({
      ...body,
      img: fileName,
    });

    if (body.info) {
      body.info.forEach((info) => {
        this.productInfo.create({
          description: info.description,
          productId: device.id,
          title: info.title,
        });
      });
    }

    return device;
  }
}

import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './dto/product.tdo';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { GetAllProductDto } from './dto/getAllProducts.dto';
import { ImagesService } from 'src/images/images.service';
import { Op } from 'sequelize';

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

  getAllByName(name: string, isLimit: boolean) {
    if (isLimit) {
      return this.product.findAll({
        limit: 3,
        where: { name: { [Op.like]: '%' + name + '%' } },
      });
    } else {
      return this.product.findAll({
        where: { name: { [Op.like]: '%' + name + '%' } },
      });
    }
  }

  getAll(product: GetAllProductDto) {
    const { typeId, brandId } = product;
    const page = product.page || 1;
    const limit = product.limit || 10;
    const offset = page * limit - limit;
    const price = product.price || [0, 10000];
    const orderBy = product.order ? product.order : null;
    console.log(price);

    if (!typeId.length && !brandId.length) {
      return this.product.findAndCountAll({
        limit,
        offset,
        where: {
          price: { [Op.between]: [price[0], price[1]] },
        },
        order: orderBy ? [['price', orderBy]] : [],
      });
    }
    if (!typeId.length && brandId.length) {
      return this.product.findAndCountAll({
        where: {
          productBrandId: { [Op.in]: brandId },
          price: { [Op.between]: [price[0], price[1]] },
        },
        limit,
        offset,
        order: orderBy ? [['price', orderBy]] : [],
      });
    }
    if (typeId.length && !brandId.length) {
      return this.product.findAndCountAll({
        where: {
          productTypeId: { [Op.in]: typeId },
          price: { [Op.between]: [price[0], price[1]] },
        },
        limit,
        offset,
        order: orderBy ? [['price', orderBy]] : [],
      });
    }
    if (typeId.length && brandId.length) {
      return this.product.findAndCountAll({
        where: {
          productTypeId: { [Op.in]: typeId },
          productBrandId: { [Op.in]: brandId },
          price: { [Op.between]: [price[0], price[1]] },
        },
        limit,
        offset,
        order: orderBy ? [['price', orderBy]] : [],
      });
    }
  }

  delete(id: number) {
    this.product.destroy({ where: { id } });
    this.productInfo.destroy({ where: { productId: id } });
  }

  async createProduct(body: ProductDto, image: Express.Multer.File) {
    const fileName = await this.imageService.createFile(image);
    console.log(fileName);
    const { description, info, name, price, productBrandId, productTypeId } =
      body;

    console.log(description);
    const device = await this.product.create({
      ...body,
      img: fileName,
    });

    if (info) {
      info.forEach((info) => {
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

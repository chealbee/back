import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BasketProducts } from 'src/basket/models/basket-prod.model';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductInfo } from 'src/product_info/models/product-info.model';
import { ProductType } from 'src/product_type/model/product_type.model';
import { ProductRating } from 'src/rating/models/rating.model';

interface CreateProduct {
  name: string;
  price: number;
  img: string;
  description: string;
  productTypeId: number;
  productBrandId: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, CreateProduct> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => ProductType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productTypeId: number;
  @BelongsTo(() => ProductType)
  type: ProductType;

  @ForeignKey(() => ProductBrand)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productBrandId: number;
  @BelongsTo(() => ProductBrand)
  brand: ProductBrand;

  @HasMany(() => ProductRating, { as: 'rating' })
  rating: ProductRating[];

  @HasMany(() => ProductInfo, { as: 'info' })
  info: ProductInfo[];

  @HasMany(() => BasketProducts, { as: 'baskets' })
  baskets: BasketProducts[];
}

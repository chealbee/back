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

@Table({ tableName: 'product' })
export class Product extends Model<Product> {
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

  @ForeignKey(() => ProductType)
  @Column
  productTypeId: number;
  @BelongsTo(() => ProductType)
  product: ProductType;

  @ForeignKey(() => ProductBrand)
  @Column
  productBrandId: number;
  @BelongsTo(() => ProductBrand)
  brand: ProductBrand;

  @HasMany(() => ProductRating)
  rating: ProductRating[];

  @HasMany(() => ProductInfo)
  info: ProductInfo[];

  @HasMany(() => BasketProducts)
  products: BasketProducts[];
}

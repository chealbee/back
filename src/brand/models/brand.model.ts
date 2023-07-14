import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { TypeBrand } from 'src/product/models/brand-type.model';
import { Product } from 'src/product/models/product.model';
import { ProductType } from 'src/product_type/model/product_type.model';

@Table({ tableName: 'product_brand' })
export class ProductBrand extends Model<ProductBrand> {
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

  @HasMany(() => Product)
  product: Product;

  @BelongsToMany(() => ProductType, () => TypeBrand)
  type: ProductType[];
}

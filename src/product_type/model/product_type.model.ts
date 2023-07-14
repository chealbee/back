import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductBrand } from 'src/brand/models/brand.model';
import { TypeBrand } from 'src/product/models/brand-type.model';

import { Product } from 'src/product/models/product.model';

interface CreateType {
  name: string;
}

@Table({ tableName: 'product_type' })
export class ProductType extends Model<ProductType, CreateType> {
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
  products: Product[];

  @BelongsToMany(() => ProductBrand, () => TypeBrand)
  brands: ProductBrand[];
}

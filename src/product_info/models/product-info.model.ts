import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
interface ICreateProductInfo {
  title: string;
  description: string;
  productId: number;
}
@Table({ tableName: 'product_info' })
export class ProductInfo extends Model<ProductInfo, ICreateProductInfo> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @BelongsTo(() => Product)
  product: Product;
}

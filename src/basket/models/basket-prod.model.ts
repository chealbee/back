import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Product } from 'src/product/models/product.model';

@Table({ tableName: 'basket_product' })
export class BasketProducts extends Model<BasketProducts> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  //   basket id
  @ForeignKey(() => Basket)
  @Column
  userId: number;
  @BelongsTo(() => Basket)
  user: Basket;
  //   basket id

  @ForeignKey(() => Product)
  @Column
  productId: number;
  @BelongsTo(() => Product)
  Product: Product;
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Product } from 'src/product/models/product.model';

@Table({ tableName: 'basket' })
export class BasketProducts extends Model<BasketProducts> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Basket)
  @Column
  userId: number;
  @BelongsTo(() => Basket)
  user: Basket;

  @ForeignKey(() => Product)
  @Column
  productId: number;
  @BelongsTo(() => Product)
  Product: Product;
}

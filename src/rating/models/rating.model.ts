import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

@Table({ tableName: 'product_rating' })
export class ProductRating extends Model<ProductRating> {
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
  rate: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  ProductId: number;
  @BelongsTo(() => Product)
  product: Product;
}

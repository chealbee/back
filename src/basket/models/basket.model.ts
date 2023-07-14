import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { BasketProducts } from './basket-prod.model';

@Table({ tableName: 'basket' })
export class Basket extends Model<Basket> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => BasketProducts)
  basketProducts: BasketProducts[];
}

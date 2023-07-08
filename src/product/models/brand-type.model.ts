import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductBrand } from 'src/brand/models/brand.model';
import { ProductType } from 'src/product_type/model/product_type.model';

@Table({ tableName: 'type_brand', createdAt: false, updatedAt: false })
export class TypeBrand extends Model<TypeBrand> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => ProductType)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => ProductBrand)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}

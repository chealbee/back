import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Role } from './roles.model';

@Table({ tableName: 'user_roles', updatedAt: false, createdAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}

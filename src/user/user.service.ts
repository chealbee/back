import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './addRole.dto';
import { Basket } from 'src/basket/models/basket.model';
import { BasketProducts } from 'src/basket/models/basket-prod.model';
import { Product } from 'src/product/models/product.model';
import { Role } from 'src/roles/models/roles.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private user: typeof User,
    @InjectModel(Basket) private basket: typeof Basket,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.user.create({ ...dto });

    const role = await this.rolesService.getRoleByValuae('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    await this.basket.create({ userId: user.id });

    return user;
  }

  async getAll() {
    const user = await this.user.findAll({ include: { all: true } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.user.findByPk(dto.userID);
    const role = await this.rolesService.getRoleByValuae(dto.value);

    if (user && role) {
      user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('user or role no found', HttpStatus.NOT_FOUND);
  }

  async getUserByEmail(email: string) {
    const user = await this.user.findOne({
      where: { email },
      include: { model: Role },
      // include: [{ model: Basket, include: [{ model: BasketProducts,include:[{model:Product}] }] }],
    });
    return user;
  }
}

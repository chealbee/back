import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/models/roles.model';
import { AddRoleDto } from './addRole.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.user.create({ ...dto });
    const role = await this.rolesService.getRoleByValuae('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll() {
    const user = await this.user.findAll({ include: { model: Role } });
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
      include: { all: true },
    });
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { RolesDto } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roles: typeof Role) {}

  async createRole(dto: RolesDto) {
    const role = await this.roles.create(dto);
    return role;
  }

  async getRoleByValuae(value: string) {
    const role = await this.roles.findOne({ where: { value } });
    return role;
  }
}

import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './roles.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: RolesDto) {
    return this.rolesService.createRole(body);
  }

  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValuae(value);
  }

  deleteRole() {}
}

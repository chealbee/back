import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './roles.dto';
import { ValidationPipe } from 'src/pipes/pipes.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAuth } from 'src/auth/roles-auth.decorator';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() body: RolesDto) {
    return this.rolesService.createRole(body);
  }

  @Get(':value')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValuae(value);
  }

  deleteRole() {}
}

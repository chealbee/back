import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuth } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoleDto } from './addRole.dto';
import { ValidationPipe } from 'src/pipes/pipes.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RolesAuth('ADMIN')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
  //   @Get()
  //   @UseGuards(JwtAuthGuard)
  //   getUser() {
  //     return this.userService.getAll();
  //   }

  @Get()
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  getUser() {
    return this.userService.getAll();
  }

  @Post('addRole')
  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}

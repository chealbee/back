import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/createUser.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcript from 'bcrypt';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.compareUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const IsIser = await this.userService.getUserByEmail(dto.email);
    if (IsIser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const hashPasword = await bcript.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPasword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
      user: { email: user.email, id: user.id, roles: user.roles },
    };
  }

  private async compareUser(userDto: CreateUserDto) {
    const userByEmail = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcript.compare(
      userDto.password,
      userByEmail.password,
    );
    if (userByEmail && passwordEquals) {
      return userByEmail;
    } else {
      throw new UnauthorizedException({
        massage: 'user or email not corect',
      });
    }
  }
}

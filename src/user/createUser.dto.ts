import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'email must be string' })
  @IsEmail({}, { message: 'not corect email' })
  email: string;

  @IsString({ message: 'password must be string' })
  @Length(3, 10, { message: 'password lenght min 3 max 10 ' })
  password: string;
}

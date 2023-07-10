import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'email nust be string' })
  @IsEmail({}, { message: 'not corect email' })
  email: string;
  @IsString({ message: 'email nust be string' })
  @Length(3, 10, { message: 'email lenght min 3 max 10 ' })
  password: string;
}

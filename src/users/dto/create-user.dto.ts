import { IsEmail, IsArray, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsEnum(['ADMIN', 'MONTAGEM', 'SUFARCAGEM', 'ANTI_REFLEXO'], { each: true })
  roles: string[];
}

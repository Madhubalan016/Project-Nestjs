
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsInt,  IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  projectId: number;
}

export class updateUserDto extends PartialType(CreateUserDto){}
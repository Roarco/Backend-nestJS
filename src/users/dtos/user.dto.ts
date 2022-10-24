import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'John@mail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  readonly password: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

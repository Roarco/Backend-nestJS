import { IsNotEmpty, IsString, IsEmail, Length, IsUUID } from 'class-validator';
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

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  readonly password: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty({ example: 'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly customerId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

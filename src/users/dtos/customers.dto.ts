import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiProperty({ example: '356456456' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('CO')
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

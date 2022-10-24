import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nike Air Max' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Nike Air Max is a shoe' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 100000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ example: 'http://localhost:3000/images/nike-air-max.jpg' })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

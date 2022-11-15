import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsPositive,
  IsUUID,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
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

  @ApiProperty({ example: 'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly brandId: string;

  @ApiProperty({
    example: [
      'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9',
      'f55029cf-6f44-4cf5-bc55-d4ae1670c7c8',
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly categoryIds: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 50 })
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 0 })
  offset: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty({ example: 100 })
  minPrice: number;

  @ValidateIf((item) => item.minPrice) // validate if minPrice is present
  @IsPositive()
  @IsNumber()
  @ApiProperty({ example: 1000 })
  maxPrice: number;
}

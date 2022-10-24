import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Shoes' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Shoes is a category of products' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'http://localhost:3000/images/shoes.jpg' })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Nike' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Nike is a brand of sports equipment and apparel' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'http://localhost:3000/images/nike.jpg' })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

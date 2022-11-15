import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @ApiProperty({ example: 'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly orderId: string;

  @ApiProperty({ example: 'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly productId: string;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

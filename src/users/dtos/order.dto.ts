import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'f35029cf-6f44-4cf5-bc55-d4ae1670c7c9' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly customerId: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

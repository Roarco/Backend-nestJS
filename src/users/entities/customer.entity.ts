import { ApiProperty } from '@nestjs/swagger';
export class Customer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  phone: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class Brand {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}

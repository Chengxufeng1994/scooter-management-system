import { ApiProperty } from '@nestjs/swagger';
export class CreateScooterDto {
  @ApiProperty()
  license: string;

  @ApiProperty()
  mileage: string;

  @ApiProperty()
  isActive: boolean;
}

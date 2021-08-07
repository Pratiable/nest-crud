import { Cat } from './../cats.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name' as const]) {
  @ApiProperty({
    example: 'test138548',
    description: 'id',
  })
  id: string;
}

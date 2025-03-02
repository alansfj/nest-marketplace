import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { IsNotBlank } from 'src/common/decorators/is-not-blank.decorator.class-validator';

export class CreateStoreDto {
  @MaxLength(100)
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Min(1, {
    each: true,
  })
  @ArrayUnique()
  @IsArray()
  categories: number[];
}

import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsNotBlank } from 'src/common/decorators/is-not-blank.decorator.class-validator';
import { IsNumberType } from 'src/common/decorators/is-number-type.decorator.class-validator';

export class UpdateProductDto {
  @MaxLength(150)
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'price must have a maximum of 2 decimals',
    },
  )
  @IsPositive()
  price: number;

  @IsIn(['MXN', 'USD'])
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsInt()
  @IsPositive()
  @IsNumberType()
  quantity: number;

  @IsInt()
  @IsPositive()
  @IsNumberType()
  subcategoryId: number;

  @IsInt()
  @IsPositive()
  @IsNumberType()
  storeId: number;

  @IsBoolean()
  active: boolean;
}

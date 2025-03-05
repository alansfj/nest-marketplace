import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from 'src/dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':productId')
  findOneById(@Param('productId', new ParseIntPipe()) productId: number) {
    return this.productService.findOneByIdOrFail(productId);
  }

  @Post()
  createProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(req.user.id, createProductDto);
  }

  @Put(':productId')
  updateProduct(
    @Request() req,
    @Param('productId', new ParseIntPipe()) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      req.user.id,
      productId,
      updateProductDto,
    );
  }

  @Delete(':productId')
  deleteOne(
    @Request() req,
    @Param('productId', new ParseIntPipe()) productId: number,
  ) {
    return this.productService.deleteOne(req.user.id, productId);
  }
}

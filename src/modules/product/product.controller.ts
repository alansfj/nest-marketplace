import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(req.user.id, createProductDto);
  }
}

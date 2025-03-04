import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { StoreModule } from '../store/store.module';
import { Product } from 'src/entities/product.entity';
import { SubcategoryModule } from '../subcategory/subcategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    StoreModule,
    SubcategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}

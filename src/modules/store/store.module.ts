import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    CategoryModule,
    forwardRef(() => ProductModule),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [TypeOrmModule, StoreService],
})
export class StoreModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from 'src/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  controllers: [],
  providers: [SubcategoryService],
  exports: [TypeOrmModule, SubcategoryService],
})
export class SubcategoryModule {}

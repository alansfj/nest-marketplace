import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryModule])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class SubcategoryModule {}

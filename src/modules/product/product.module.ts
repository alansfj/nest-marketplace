import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModule])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProductModule {}

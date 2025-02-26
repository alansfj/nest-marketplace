import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class StoreModule {}

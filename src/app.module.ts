import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { validate } from 'src/common/utils/env-validation';
import { User } from './entities/user.entity';
import { Store } from './entities/store.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { StoreModule } from './modules/store/store.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: true,
        entities: [User, Store, Product, Category, Subcategory],
        migrations: [],
        migrationsTableName: 'migrations',
        // autoLoadEntities: true,
      }),
    }),
    UserModule,
    AuthModule,
    StoreModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

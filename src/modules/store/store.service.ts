import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from 'src/dtos/create-store.dto';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private categoryService: CategoryService,
  ) {}

  async createStore(userId: number, createStoreDto: CreateStoreDto) {
    const categories = await this.categoryService.findByIds(
      createStoreDto.categories,
    );

    if (categories.length !== createStoreDto.categories.length) {
      throw new BadRequestException('Some categories do not exist');
    }

    const newStore = this.storeRepository.create({
      name: createStoreDto.name,
      description: createStoreDto.description,
      user: { id: userId },
      categories,
    });

    return await this.storeRepository.save(newStore);
  }
}

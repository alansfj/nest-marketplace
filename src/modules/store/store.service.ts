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

  async findAll(userId: number): Promise<{
    stores: Store[];
    count: number;
  }> {
    const [stores, count] = await this.storeRepository.findAndCountBy({
      user: { id: userId },
    });

    return { stores, count };
  }

  async createStore(
    userId: number,
    createStoreDto: CreateStoreDto,
  ): Promise<Store> {
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

  async deleteOne(
    userId: number,
    storeId: number,
  ): Promise<{
    result: boolean;
  }> {
    const updateResult = await this.storeRepository.softDelete({
      id: storeId,
      user: { id: userId },
    });

    if (updateResult.affected) return { result: true };

    throw new BadRequestException('store not found');
  }
}

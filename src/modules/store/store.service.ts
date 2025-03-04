import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from 'src/dtos/create-store.dto';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { UpdateStoreDto } from 'src/dtos/update-store.dto';

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
    const [stores, count] = await this.storeRepository.findAndCount({
      where: {
        user: { id: userId },
      },
      relations: {
        categories: true,
      },
    });

    return { stores, count };
  }

  async findUserSpecificStoreOrFail(
    userId: number,
    storeId: number,
  ): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId, user: { id: userId } },
    });

    if (!store) throw new NotFoundException('store not found');

    return store;
  }

  async createStore(
    userId: number,
    createStoreDto: CreateStoreDto,
  ): Promise<Store> {
    const categories = await this.categoryService.findByIdsOrFail(
      createStoreDto.categories,
    );

    const newStore = this.storeRepository.create({
      name: createStoreDto.name,
      description: createStoreDto.description,
      user: { id: userId },
      categories,
    });

    return await this.storeRepository.save(newStore);
  }

  async updateStore(
    userId: number,
    storeId: number,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId, user: { id: userId } },
      relations: {
        categories: true,
      },
    });

    if (!store) throw new NotFoundException('store not found');

    const categories = await this.categoryService.findByIdsOrFail(
      updateStoreDto.categories,
    );

    store.name = updateStoreDto.name;
    store.description = updateStoreDto.description;
    store.categories = categories;

    return await this.storeRepository.save(store);
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

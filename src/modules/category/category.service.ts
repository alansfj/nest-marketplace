import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async existsById(categoryId: number): Promise<boolean> {
    return await this.categoryRepository.existsBy({ id: categoryId });
  }

  async existsByIds(categoriesIds: number[]): Promise<boolean> {
    const count = await this.categoryRepository.countBy({
      id: In(categoriesIds),
    });

    return count === categoriesIds.length;
  }

  async findByIds(categoriesIds: number[]): Promise<Category[]> {
    return await this.categoryRepository.findBy({ id: In(categoriesIds) });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from 'src/entities/subcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findByIdOrFail(subcategoryId: number): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
    });

    if (!subcategory) throw new NotFoundException('subcategory not found');

    return subcategory;
  }
}

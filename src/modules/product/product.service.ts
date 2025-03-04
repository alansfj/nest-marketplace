import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { StoreService } from '../store/store.service';
import { SubcategoryService } from '../subcategory/subcategory.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private storeService: StoreService,
    private subcategoryService: SubcategoryService,
  ) {}

  async createProduct(userId: number, createProductDto: CreateProductDto) {
    await this.storeService.findUserSpecificStoreOrFail(
      userId,
      createProductDto.storeId,
    );

    await this.subcategoryService.findByIdOrFail(
      createProductDto.subcategoryId,
    );

    const newProduct = this.productRepository.create({
      user: { id: userId },
      store: { id: createProductDto.storeId },
      subcategory: { id: createProductDto.subcategoryId },
      currency: createProductDto.currency,
      description: createProductDto.description,
      name: createProductDto.name,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      sku: createProductDto.sku,
    });

    const savedProduct = await this.productRepository.save(newProduct);

    return this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['user', 'store', 'subcategory'],
    });
  }
}

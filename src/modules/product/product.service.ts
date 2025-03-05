import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { StoreService } from '../store/store.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { UpdateProductDto } from 'src/dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @Inject(forwardRef(() => StoreService))
    private storeService: StoreService,
    private subcategoryService: SubcategoryService,
  ) {}

  async findOneByIdOrFail(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['user', 'subcategory', 'store'],
    });

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async findUserSpecificProductOrFail(
    userId: number,
    productId: number,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId, user: { id: userId } },
    });

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async findStoreProducts(storeId: number): Promise<{
    products: Product[];
    count: number;
  }> {
    const [products, count] = await this.productRepository.findAndCount({
      where: { store: { id: storeId } },
      relations: ['subcategory'],
    });

    return { products, count };
  }

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

  async updateProduct(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const [product, store, subcategory] = await Promise.all([
      this.findUserSpecificProductOrFail(userId, productId),
      this.storeService.findUserSpecificStoreOrFail(
        userId,
        updateProductDto.storeId,
      ),
      this.subcategoryService.findByIdOrFail(updateProductDto.subcategoryId),
    ]);

    // TODO: si elige una subcategoria que no pertenece a una categoria de la tienda,
    // agregarle la categoria a la tienda. Puede ser con un evento de dominio.

    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.active = updateProductDto.active;
    product.currency = updateProductDto.currency;
    product.price = updateProductDto.price;
    product.quantity = updateProductDto.quantity;
    product.sku = updateProductDto.sku;
    product.store = store;
    product.subcategory = subcategory;

    await this.productRepository.save(product);

    return await this.findOneByIdOrFail(productId);
  }

  async deleteOne(
    userId: number,
    productId: number,
  ): Promise<{
    result: boolean;
  }> {
    const updateResult = await this.productRepository.softDelete({
      id: productId,
      user: { id: userId },
    });

    if (updateResult.affected) return { result: true };

    throw new BadRequestException('product not found');
  }
}

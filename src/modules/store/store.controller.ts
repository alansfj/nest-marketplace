import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateStoreDto } from 'src/dtos/create-store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  createStore(@Request() req, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(req.user.id, createStoreDto);
  }
}

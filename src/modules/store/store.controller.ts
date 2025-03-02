import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { CreateStoreDto } from 'src/dtos/create-store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll(@Request() req) {
    return this.storeService.findAll(req.user.id);
  }

  @Post()
  createStore(@Request() req, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(req.user.id, createStoreDto);
  }

  @Delete(':storeId')
  deleteOne(
    @Request() req,
    @Param('storeId', new ParseIntPipe()) storeId: number,
  ) {
    return this.storeService.deleteOne(req.user.id, storeId);
  }
}

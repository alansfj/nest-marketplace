import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateStoreDto } from 'src/dtos/create-store.dto';
import { StoreService } from './store.service';
import { UpdateStoreDto } from 'src/dtos/update-store.dto';

@Controller('stores')
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

  @Put(':storeId')
  updateStore(
    @Request() req,
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.updateStore(req.user.id, storeId, updateStoreDto);
  }

  @Delete(':storeId')
  deleteOne(
    @Request() req,
    @Param('storeId', new ParseIntPipe()) storeId: number,
  ) {
    return this.storeService.deleteOne(req.user.id, storeId);
  }
}

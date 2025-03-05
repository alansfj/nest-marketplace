import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findOneById(id);
  }
}

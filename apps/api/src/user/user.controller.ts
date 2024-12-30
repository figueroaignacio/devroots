// users.controller.ts
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

import { PasswordRemovalInterceptor } from './interceptors/password-removal.interceptor';

@Controller('users')
@UseInterceptors(PasswordRemovalInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
}

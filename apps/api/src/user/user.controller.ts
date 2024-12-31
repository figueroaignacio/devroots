import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PasswordRemovalInterceptor } from './interceptors/password-removal.interceptor';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(PasswordRemovalInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
}

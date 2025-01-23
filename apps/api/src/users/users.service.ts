import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findOneUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findUserPosts(userId: string) {
    return this.prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    });
  }
}

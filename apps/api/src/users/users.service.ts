import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: createUserDto,
    });
  }

  async getAllUsers() {
    return this.db.user.findMany();
  }

  async getUserById(id: string) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async getUserByUsername(username: string) {
    return this.db.user.findUnique({
      where: { username },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: string) {
    return this.db.user.delete({
      where: { id },
    });
  }

  async getUserPosts(userId: string) {
    return this.db.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    });
  }

  async getUserComments(userId: string) {
    return this.db.comment.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    });
  }
}

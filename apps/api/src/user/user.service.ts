import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/hash.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return new UserResponseDto(savedUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return new UserResponseDto(user);
  }

  async updateRefreshToken(
    userId: string,
    refreshTokenDto: RefreshTokenDto,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: refreshTokenDto.refreshToken,
    });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }
}

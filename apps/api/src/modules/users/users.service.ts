import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async findByGithubId(githubId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { githubId } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async createFromGithub(profile: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({
      githubId: profile.id,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar_url,
      name: profile.name,
    });

    return this.userRepo.save(user);
  }

  async updateFromGithub(user: User, profile: UpdateUserDto): Promise<User> {
    user.username = profile.username;
    user.email = profile.email;
    user.avatar = profile.avatar_url;
    user.name = profile.name;

    return this.userRepo.save(user);
  }
}

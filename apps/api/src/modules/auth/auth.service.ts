import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginResponseDto, UserDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateGitHubUser(profile: CreateUserDto): Promise<User> {
    let user = await this.usersService.findByGithubId(profile.id);

    if (user) {
      user = await this.usersService.updateFromGithub(user, profile);
    } else {
      user = await this.usersService.createFromGithub(profile);
    }

    return user;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id };

    const userDto = plainToInstance(UserDto, {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatar,
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: userDto,
    };
  }

  getCookiesOptions() {
    return {
      // httpOnly: true,
      // secure: this.configService.get('NODE_ENV') === 'production',
      // secure: false,
      // sameSite: 'lax' as const,
      // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // path: '/',
      httpOnly: true,
      secure: false, // debe estar en false en local
      sameSite: 'lax' as const,
      path: '/',
      domain: 'localhost', // 👈 ESTA LÍNEA ES CLAVE
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}

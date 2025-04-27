import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/hash.util';
import { RefreshTokenDto } from '../user/dto/refresh-token.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (user && (await validatePassword(password, user.password))) {
      return new UserResponseDto(user);
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<TokensDto> {
    try {
      const existingUser = await this.userService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const user = await this.userService.create(registerDto);
      const tokens = await this.generateTokens(user);
      await this.userService.updateRefreshToken(user.id, {
        refreshToken: tokens.refreshToken,
      });
      return tokens;
    } catch (error) {
      console.error('Error in register service:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.generateTokens(user);
    await this.userService.updateRefreshToken(user.id, {
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.userService.removeRefreshToken(userId);
  }

  async refresh(
    userId: string,
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokensDto> {
    const user = await this.userService.findById(userId);
    if (
      !user ||
      !user.refreshToken ||
      user.refreshToken !== refreshTokenDto.refreshToken
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokens = await this.generateTokens(user);
    await this.userService.updateRefreshToken(user.id, {
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  }

  async getCurrentUser(userId: string): Promise<UserResponseDto> {
    return this.userService.findById(userId);
  }

  private async generateTokens(user: UserResponseDto): Promise<TokensDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}

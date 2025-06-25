import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthStatusDto } from './dto/auth-status.dto';
import { UserDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { GitHubAuthGuard } from './guards/github-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get('login')
  @UseGuards(GitHubAuthGuard)
  async login() {
    // El guard redirige automáticamente a GitHub
  }

  @Get('github/callback')
  @UseGuards(GitHubAuthGuard)
  async githubCallback(
    @Req() req: Request & { user: User },
    @Res() res: Response
  ) {
    const { access_token, user } = await this.authService.login(req.user);

    res.cookie(
      'access_token',
      access_token,
      this.authService.getCookiesOptions()
    );

    const frontendUrl = this.configService.get('FRONTEND_URL');
    res.redirect(`${frontendUrl}/home`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request & { user: User }): Promise<UserDto> {
    return plainToInstance(UserDto, {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      name: req.user.name,
      avatarUrl: req.user.avatar,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response): Promise<Response<LogoutResponseDto>> {
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'lax',
    });

    return res.json({ message: 'Logged out successfully' });
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getStatus(
    @Req() req: Request & { user: User }
  ): Promise<AuthStatusDto> {
    const userDto = plainToInstance(UserDto, {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      name: req.user.name,
      avatarUrl: req.user.avatar,
    });

    return {
      isAuthenticated: true,
      user: userDto,
    };
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const tokens = await this.authService.register(registerDto);
    this.setCookies(res, tokens);
    res.status(HttpStatus.CREATED).json({ message: 'User registered' });
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    this.setCookies(res, tokens);
    res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: UserResponseDto, @Res() res: Response) {
    await this.authService.logout(user.id);
    this.clearCookies(res);
    res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authService.refresh(userId, { refreshToken });
    this.setCookies(res, tokens);
    res.status(HttpStatus.OK).json({ message: 'Tokens refreshed' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: UserResponseDto) {
    return this.authService.getCurrentUser(user.id);
  }

  private setCookies(res: Response, tokens: TokensDto) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private clearCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}

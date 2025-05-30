import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'passport-github2';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateOAuthLogin(provider: string, profile: Profile): Promise<User> {
    const providerId = profile.id.toString();
    const username = profile.username || profile.displayName;
    const email = profile.emails?.[0]?.value;
    const avatarUrl = profile.photos?.[0]?.value;

    let user = await this.userRepo.findOne({ where: { provider, providerId } });

    if (!user) {
      user = this.userRepo.create({
        provider,
        providerId,
        username,
        email,
        avatarUrl,
      });
      await this.userRepo.save(user);
    }
    return user;
  }

  generateJwt(user: User): string {
    const payload = { userId: user.id, provider: user.provider };
    return this.jwtService.sign(payload);
  }

  verifyJwt(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

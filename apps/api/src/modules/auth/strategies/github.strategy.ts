import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { User } from 'src/modules/users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<User> {
    const { id, username, emails, photos, displayName } = profile;

    const githubProfile = {
      id: id.toString(),
      username,
      email: emails?.[0]?.value || '',
      avatar_url: photos?.[0]?.value || '',
      name: displayName || username,
    };

    return this.authService.validateGitHubUser(githubProfile);
  }
}

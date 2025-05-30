import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.jwt;
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    return req;
  }
}

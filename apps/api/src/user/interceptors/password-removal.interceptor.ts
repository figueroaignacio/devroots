import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordRemovalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          });
        }

        if (data && data.password) {
          const { password, ...userWithoutPassword } = data;
          return userWithoutPassword;
        }

        return data;
      }),
    );
  }
}

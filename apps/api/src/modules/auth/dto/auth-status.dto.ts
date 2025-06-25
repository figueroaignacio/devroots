import { Expose, Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { UserDto } from './login-response.dto';

export class AuthStatusDto {
  @Expose()
  @IsBoolean()
  isAuthenticated: boolean;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}

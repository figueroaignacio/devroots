import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LogoutResponseDto {
  @Expose()
  @IsString()
  message: string;
}

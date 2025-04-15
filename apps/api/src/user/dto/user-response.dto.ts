import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

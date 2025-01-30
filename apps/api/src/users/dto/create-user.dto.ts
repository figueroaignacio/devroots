import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'strongPassword123',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  password?: string;
}

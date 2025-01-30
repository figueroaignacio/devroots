import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommunityDto {
  @ApiProperty({
    description: 'The name of the community',
    example: 'Programming Enthusiasts',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the community',
    example: 'A community for sharing programming tips and experiences',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'UUID of the community owner',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;
}

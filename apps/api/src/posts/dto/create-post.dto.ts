import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Blog Post',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: 'This is the content of my first blog post...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Whether the post is published',
    example: true,
    default: false,
  })
  @IsBoolean()
  published: boolean;

  @ApiProperty({
    description: 'ID of the user who created the post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  authorId: string;
}

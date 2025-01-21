import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsBoolean()
  published: boolean;

  authorId: string;
}

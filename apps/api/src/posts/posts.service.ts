import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPostDto: CreatePostDto) {
    const { content, slug, title, user_id, published_at, status } =
      createPostDto;

    const query = ` 
      INSERT INTO posts (user_id, title, content, status, published_at, slug)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await this.databaseService.query(query, [
      user_id,
      title,
      content,
      status || 'draft',
      published_at,
      slug,
    ]);

    return result[0];
  }

  async findAll() {
    const query = `
      SELECT 
        p.id, 
        p.title, 
        p.content, 
        p.created_at AS "createdAt", 
        u.name AS author, 
        u.image AS "authorImage"
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC;
    `;
    const result = await this.databaseService.query(query);

    return result;
  }

  async findOne(id: number) {
    const query = `SELECT * FROM posts WHERE id = $1;`;
    const result = await this.databaseService.query(query, [id]);

    if (result.length === 0) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return result[0];
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const fields = Object.keys(updatePostDto)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = Object.values(updatePostDto);
    const query = `
      UPDATE posts
      SET ${fields}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length + 1}
      RETURNING *;
    `;
    const result = await this.databaseService.query(query, [...values, id]);
    if (result.length === 0) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return result[0];
  }

  async remove(id: number) {
    const query = `DELETE FROM posts WHERE id = $1 RETURNING *;`;
    const result = await this.databaseService.query(query, [id]);

    if (result.length === 0) {
      throw new Error(`Post with ID ${id} not found`);
    }

    return result[0];
  }
}

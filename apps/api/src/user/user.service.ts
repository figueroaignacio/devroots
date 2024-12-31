import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const users = await this.db.query('SELECT * FROM users');
    for (const user of users) {
      const posts = await this.db.query(
        'SELECT * FROM posts WHERE user_id = $1',
        [user.id],
      );
      user.posts = posts;
    }

    return users;
  }

  async findOneById(id: number) {
    const user = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.length === 0) {
      return null;
    }

    const posts = await this.db.query(
      'SELECT * FROM posts WHERE user_id = $1',
      [id],
    );
    user[0].posts = posts;

    return user[0];
  }

  async createUser(email: string, name: string) {
    return this.db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name],
    );
  }
}

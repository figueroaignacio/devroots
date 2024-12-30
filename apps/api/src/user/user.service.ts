import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.query('SELECT * FROM users');
  }

  async findOneById(id: number) {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
  }

  async createUser(email: string, name: string) {
    return this.db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name],
    );
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onModuleInit() {
    const admin = await this.repo.findOneBy({ email: 'admin@gmail.com' });
    if (!admin) {
      const hash = await bcrypt.hash('Admin@12345', 10);
      const user = this.repo.create({
        email: 'admin@gmail.com',
        password: hash,
        role: 'admin',
      });
      await this.repo.save(user);
      console.log('✅ Admin user seeded');
    }
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}

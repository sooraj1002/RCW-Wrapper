import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/types/entities';

@Injectable()
export class AuthService {
  private logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(AuthService.name);
  }
  async signup(user: User) {
    try {
    } catch (err) {
      this.logger.error(`Error saving user to database: ${err}`);
    }
  }
}

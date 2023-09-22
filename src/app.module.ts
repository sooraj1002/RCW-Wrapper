import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { IdentityService } from './identity/identity.service';
import { SchemaService } from './schema/schema.service';
import { CredentialsService } from './credentials/credentials.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from './config/config.service';

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    IdentityService,
    SchemaService,
    CredentialsService,
    ConfigService,
  ],
})
export class AppModule {}

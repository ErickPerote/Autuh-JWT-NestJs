import { User } from './database/models/user.entity';
import { join } from 'path';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, './database/models/', '*.{ts,js}')],
      synchronize: true,
    } as TypeOrmModuleOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

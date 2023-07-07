import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from './../../database/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repository/user.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './../../controllers/authentication/authentication.controller';
import { UserModule } from './../../controllers/user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        UserModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            privateKey: process.env.JWT_SECRET,
            signOptions: { expiresIn:  process.env.JWT_EXPIRES }
        })
    ],
    providers: [AuthService, LocalStrategy, UserRepository, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
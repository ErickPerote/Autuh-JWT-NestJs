import { JwtService } from '@nestjs/jwt';
import { User } from './../../database/models/user.entity';
import { UserRepository } from 'src/database/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService

  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email  }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async signIn(email: string, password: string) {
    let user: User;

    try {
      user = await this.userRepository.findOneByEmail(email)
    } catch (error) {
      return null 
    };

    const isPasswordValid = compareSync(password, user.password);
    if(!isPasswordValid) return null;

    return user;
  }
}
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../../database/models/user.entity';
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "../../database/repository/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}

import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { UpdateUserDto } from 'src/controllers/user/dto/update-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(user: CreateUserDto) {
        const create = await this.usersRepository.create(user)
        return await this.usersRepository.save(create)
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            select: ['id', 'name', 'email', 'deleted', 'createdAt', 'updatedAt']
        });
    }

    async findOneBy(id: number){
        return this.usersRepository.findOneBy({
            id
        })
    }

    async findOneByEmail(email: string){
        return this.usersRepository.findOneBy({
            email
        })
    }

    async update(id: number, user: Partial<any>) {
        const userId =  await this.usersRepository.findOne({ where: {id} })
        this.usersRepository.merge(userId, user);
        return await this.usersRepository.save(userId)
    }

    async delete(id: number) {
        return await this.usersRepository.delete(id)
    }

}

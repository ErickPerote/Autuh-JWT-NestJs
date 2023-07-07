import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserRepository } from "../../database/repository/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    @Get()
    async findAll() {
        return await  this.userRepository.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.userRepository.findOneBy(id)
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userRepository.create(body)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
        return await this.userRepository.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number) {
        return await this.userRepository.delete(id)
    }
}
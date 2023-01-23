import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { СreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService { 

    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService) {}

    async createUser(dto: СreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }


    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async updateUser(id: number, userDto: UpdateUserDto)  {
        return this.userRepository.update(userDto, {where: {id}});
    }
    
    async removeUser(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        await user.destroy();
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async addRole(roleDto: UpdateRoleDto) {
        const user = await this.userRepository.findByPk(roleDto.id);
        const role = await this.rolesService.getRoleByValue(roleDto.value);
        if (role && user) {
             await user.$add('role', role.id);
             return roleDto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(userDto: BanUserDto) {
        const user = await this.userRepository.findByPk(userDto.id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        }
        user.banned = true;
        user.banReason = userDto.banReason;
        await user.save();
        return user;
    }

    async unbanned(userDto: BanUserDto) {
        const user = await this.userRepository.findByPk(userDto.id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        }
        user.banned = false;
        user.banReason = null;
        await user.save();
        return user;
    }
    
}

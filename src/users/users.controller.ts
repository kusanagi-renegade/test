import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { СreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: СreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Изменение пользователя'})
    @ApiResponse({status: 200, type: [User]})
    @Put('/:id')
    updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({summary: 'Удаление пользователя (authJWT)'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    removeUser(@Param('id') id: number) {
        return this.usersService.removeUser(id);
    }

    @ApiOperation({summary: 'Выдача роли'})
    @ApiResponse({status: 200})
    @Post('/role')
    addRole(@Body() roleDto: UpdateRoleDto) {
        return this.usersService.addRole(roleDto);
    }

    @ApiOperation({summary: 'Бан пользователя (adminJWT)'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() userDto: BanUserDto) {
        return this.usersService.ban(userDto);
    }

    @ApiOperation({summary: 'Разблокирование пользователя'})
    @ApiResponse({status: 200})
    @Post('/unbanned')
    unbanned(@Body() userDto: BanUserDto) {
        return this.usersService.unbanned(userDto);
    }

}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { Role } from './roles.model';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение роли'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({summary: 'Изменение роли'})
    @ApiResponse({status: 200, type: [Role]})
    @Put('/:id')
    updateUser(@Param('id') id: number, @Body() userDto: UpdateRoleDto) {
        return this.rolesService.updateRole(id, userDto);
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200, type: [Role]})
    @Delete('/:id')
    removeRole(@Param('id') id: number) {
        return this.rolesService.removeRole(id);
    }

}

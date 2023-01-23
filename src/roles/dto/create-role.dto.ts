import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Роль пользователя'})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    readonly description: string;
}
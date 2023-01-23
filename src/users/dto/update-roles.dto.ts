import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UpdateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Роль пользователя'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'ID пользователя'})
    readonly id: number;

}
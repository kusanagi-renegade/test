import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class BanUserDto {

    @ApiProperty({example: '1', description: 'ID пользователя'})
    readonly id: number;

    @ApiProperty({example: 'За нарушение', description: 'Причина бана'})
    readonly banReason: string;

}
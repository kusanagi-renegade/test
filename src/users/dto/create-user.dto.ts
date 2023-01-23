import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class СreateUserDto {
    
    @ApiProperty({example: 'user@mail.ru', description: 'Эл.почта'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    readonly password: string;
    
}
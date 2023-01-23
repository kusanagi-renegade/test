import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles])
    ],
    controllers: [
        RolesController,
    ],
    providers: [
        RolesService,
    ],
    exports: [
        RolesService,
    ],
})

export class RolesModule {}

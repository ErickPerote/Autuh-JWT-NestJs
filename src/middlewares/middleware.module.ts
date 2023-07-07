import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserRepository } from "src/database/repository/user.repository";
import { AuthModule } from "src/services/auth/auth.module";


@Module({
    imports: [
        AuthModule,
    ],
    providers: [
        UserRepository,
    ]
})

export class MiddlewareModule {}
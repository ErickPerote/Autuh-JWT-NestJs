import { MessagesHelpers } from './../../../helpers/message.helper';
import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string ) {
        const user = await this.authService.signIn(email, password);

        if(!user) {
            throw new UnauthorizedException(MessagesHelpers.ERROR_LOGIN)
        }

        return user 
    }
}
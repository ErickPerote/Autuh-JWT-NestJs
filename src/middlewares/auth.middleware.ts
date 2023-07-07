import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRepository } from "src/database/repository/user.repository";
import { AuthService } from "src/services/auth/auth.service";


@Injectable()

export class AuthMiddleware implements NestInterceptor {

    constructor(
        private userRepository: UserRepository,
        private auth: AuthService

    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {

        const request = context.switchToHttp().getRequest();

        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
          throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }

        try {
            const token = authorizationHeader.substring(7, authorizationHeader.length);
            console.log(authorizationHeader)
      
            //const payload = await this.auth.decode(token);
           // console.log("payload", payload)

      
            let user = await this.userRepository.findOneBy(0)
      
            request.session = user;  
      
            /*if (!payload) {
              throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
            }*/
      
          } catch (error) {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
          }
    }
        

}
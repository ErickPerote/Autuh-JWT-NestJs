import { MessagesHelpers } from './../../../helpers/message.helper';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { RegexHelper } from "src/helpers/regex.helper";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password, { message: MessagesHelpers.MESSAGE_PASSWORD })
    password: string;
}
  
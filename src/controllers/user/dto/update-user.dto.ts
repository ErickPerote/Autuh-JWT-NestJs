import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    nome?: string;
}
  
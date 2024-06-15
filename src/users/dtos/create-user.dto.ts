import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ default: "example@test.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ default: "test4321" })
    @IsString()
    password: string;
}
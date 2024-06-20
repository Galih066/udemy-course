import { IsEmail, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ default: "example@test.com" })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({ default: "test4321" })
    @IsString()
    @IsOptional()
    password: string;
}
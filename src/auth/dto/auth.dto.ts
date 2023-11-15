import { IsEmail,IsNotEmpty, IsOptional } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto{

    @ApiProperty({
        example:"sagar@gmail.com",
        required:true
    })
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        example:"sagar",
        required:true
    })
    @IsNotEmpty()
    password:string


    @IsOptional()
    role?:Roles
}

export enum Roles{
    admin="admin",
    user="user"
}

export class LoginDto{

    @ApiProperty({
        example:"sagar@gmail.com",
        required:true
    })
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        example:"sagar",
        required:true
    })
    @IsNotEmpty()
    password:string

    @IsOptional()
    role?:Roles
}
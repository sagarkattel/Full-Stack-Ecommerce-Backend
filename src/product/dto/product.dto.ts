import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class ProductDto{
    @ApiProperty({
        example:"Title 1",
        required:true
    })
    @IsNotEmpty()
    title:string;

    @ApiProperty({
        example:720,
        required:true
    })
    @IsNotEmpty()
    price:number;

    @ApiProperty({
        example:"https://www.google.com",
        required:true
    })
    @IsNotEmpty()
    imgurl:string;
}
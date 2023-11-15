import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}
    
    async createProduct(dto: ProductDto) {
        try{
        const result = await this.prisma.product.create({
            data:{
                title:dto.title,
                price:dto.price,
                imgurl:dto.imgurl
            }
        })
        return {"Created Successfully":result};
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              throw new ForbiddenException("Credentials Taken");
            }
          }
          throw error;
    }
    }

    async deleteProduct(id:string){
        const result = await this.prisma.product.delete({
            where:{
                id:parseInt(id)
            }
        })
        return {"Deleted Successfully":result};
    }

    async updateProduct(dto:ProductDto,id:string){
        const result = await this.prisma.product.update({
            where:{
                id:parseInt(id)
            },
            data:{
                title:dto.title,
                price:dto.price,
                imgurl:dto.imgurl
            }
        })
        return {"Updated Successfully":result};
    }

    async getAllProduct() {
        const result = this.prisma.product.findMany()
        return result;
    }
}

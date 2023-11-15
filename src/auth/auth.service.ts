import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";




@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt:JwtService,private config:ConfigService) {}
  async login(dto: LoginDto) {
      const users = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
  
      if (!users) {
        throw new ForbiddenException("Invalid Credientials");
      }
  
      const valid = await argon.verify(users.password, dto.password);
  
      if (!valid) {
        throw new ForbiddenException("Invalid Credientials");
      }

      delete users.password;
  
      return this.signToken(users.id,users.email,users.role);
    
  }

  async register(dto: RegisterDto) {
    
      const hash: string = await argon.hash(dto.password);
      try {
      const result = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role:dto.role
        },
      });
      return this.signToken(result.id,result.email,result.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials Taken");
        }
      }
      throw error;
    }
  }


  getAllUser=async()=>{
    const result=await this.prisma.user.findMany();
    return result;
  }

  
    




  async signToken(userId:number,email:string,role:string):Promise<{access_token:string}>{
    const payload = {email,sub:userId,role};
    const secret=this.config.get("JWT_SECRET");
    const token=await this.jwt.signAsync(payload,{
      expiresIn:'15m',
      secret:secret
    });
    return {
      access_token:token
    };
  }




  updateUser=async(dto:LoginDto,id:string)=>{
    const hash: string = await argon.hash(dto.password);
    const result=await this.prisma.user.update({
        where:{
            id:parseInt(id)
        },
        data:{
            email:dto.email,
            password:hash,
            role: dto.role 
        }
    });
    return {"Updated Successfully":result};
  }

  deleteUser=async(id:string)=>{
    const result=await this.prisma.user.delete({
        where:{
            id:parseInt(id)
        }
    });
    return {"Deleted Successfully":result};
  }


  
}

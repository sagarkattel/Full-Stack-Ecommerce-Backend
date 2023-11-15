import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser, Roles } from 'src/auth/decorator';

import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags("Users")
@ApiBearerAuth('Authorization') 
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get("me")
    getMe(@GetUser() user:User){
        return user;
    }

    @Get("admin")
  @ApiBearerAuth('Authorization') 
  @UseGuards(JwtGuard, RolesGuard)
  @Roles("admin")
  getAdminData() {
    return 'This is Admin Data';
  }



    
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import {   ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "./decorator/roles.decorator";

import { RolesGuard } from "./guard/roles.guard";
import { JwtGuard } from "./guard/jwt.guard";




@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get("allusers")
  // @ApiBearerAuth('Authorization') 
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles("user","admin")
  getALlUser() {
    return this.authService.getAllUser();
  }

  @Get("admin")
  @ApiBearerAuth('Authorization') 
  @UseGuards(JwtGuard, RolesGuard)
  @Roles("admin")
  getAdminData() {
    return 'This is Admin Data';
  }

  

  @HttpCode(HttpStatus.OK)
  @Put(":id")
  updateUser(@Body() dto: LoginDto, @Param("id") id: string) {
    return this.authService.updateUser(dto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.authService.deleteUser(id);
  }
}

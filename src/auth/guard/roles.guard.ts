import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // console.log("Hello ROles",roles);
    if (!roles) {
      return true; // If no roles are defined, allow access
    }



    const user = context.switchToHttp().getRequest().user;

    // Log user information
    // console.log('User:', user);

    // Ensure that the user object and the role property are defined
    if (user && user?.role) {
      // console.log('User role:', user?.role);s

      // Check if the user has the required role
      if (roles.some((role) => user?.role === role)) {
        return true;
      }
    }

    return false;
  }
}

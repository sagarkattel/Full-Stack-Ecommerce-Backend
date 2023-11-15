import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
  // console.log('Roles metadata:', roles); // Add a console.log here
  return SetMetadata('roles', roles);
}

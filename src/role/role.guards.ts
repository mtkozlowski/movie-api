import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/types/role.type';
import { RoleService } from './role.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('RoleService')
    private readonly roleService: RoleService,
    @Inject('JwtService')
    readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const Authorization = request.get('Authorization');
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const { userId, role: userRole } = this.jwtService.verify(token) as {
        userId: number;
        role: Role;
      };
      const isUserAllowedToAddNewMovie = await this.roleService.isUserAllowedToAddNewMovie(
        userId,
        userRole,
      );
      if (isUserAllowedToAddNewMovie) {
        return true;
      } else {
        throw new ForbiddenException(
          'You have exceeded quota of maximum movies to add per month',
        );
      }
    }
  }
}

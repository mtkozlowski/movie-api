import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      const { userId, role } = this.jwtService.verify(token);
      const isUserAllowedToAddNewMovie =
        await this.roleService.isUserAllowedToAddNewMovie(userId, role);
      if (isUserAllowedToAddNewMovie) {
        return true;
      } else {
        throw new ForbiddenException(
          'You have exceeded quota of maximum movies to add per month',
        );
      }
    }
    return true;
  }
}

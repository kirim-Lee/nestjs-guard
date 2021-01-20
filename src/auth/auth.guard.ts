import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { Role } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRole(role: UserRole, roles: Role[]): boolean {
    return roles.includes(role) || roles.includes('Any');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];

    return !roles || this.matchRole(user.role, roles);
  }
}

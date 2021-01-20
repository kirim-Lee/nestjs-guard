import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

export type Role = keyof typeof UserRole | 'Any';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

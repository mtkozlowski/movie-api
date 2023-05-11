import { Global, Module } from '@nestjs/common';
import { RoleService } from './role.service';

@Global()
@Module({
  imports: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}

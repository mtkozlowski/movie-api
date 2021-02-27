import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalSourceService } from './external-source.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ExternalSourceService],
  exports: [ExternalSourceService],
})
export class ExternalSourceModule {}

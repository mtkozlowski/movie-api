import { HttpModule, Module } from '@nestjs/common';
import { ExternalSourceService } from './external-source.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalSourceService],
  exports: [ExternalSourceService],
})
export class ExternalSourceModule {}

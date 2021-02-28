import { HttpModule, Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';

@Module({
  imports: [HttpModule],
  providers: [OmdbService],
  exports: [OmdbService],
})
export class OmdbModule {}

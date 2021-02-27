import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSourceService } from './external-source.service';

describe('ExternalSourceService', () => {
  let service: ExternalSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalSourceService],
    }).compile();

    service = module.get<ExternalSourceService>(ExternalSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

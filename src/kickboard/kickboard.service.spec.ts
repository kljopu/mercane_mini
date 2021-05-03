import { Test, TestingModule } from '@nestjs/testing';
import { KickboardService } from './kickboard.service';

describe('KickboardService', () => {
  let service: KickboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KickboardService],
    }).compile();

    service = module.get<KickboardService>(KickboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

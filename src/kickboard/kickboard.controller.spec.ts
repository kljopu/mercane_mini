import { Test, TestingModule } from '@nestjs/testing';
import { KickboardController } from './kickboard.controller';

describe('KickboardController', () => {
  let controller: KickboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KickboardController],
    }).compile();

    controller = module.get<KickboardController>(KickboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

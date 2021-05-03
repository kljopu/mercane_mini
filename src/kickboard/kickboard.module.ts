import { Module } from '@nestjs/common';
import { KickboardService } from './kickboard.service';
import { KickboardController } from './kickboard.controller';

@Module({
  providers: [KickboardService],
  controllers: [KickboardController]
})
export class KickboardModule {}

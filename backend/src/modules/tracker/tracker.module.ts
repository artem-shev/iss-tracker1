import { Module } from '@nestjs/common';
import TrackerService from './tracker.service';
import TrackerController from './tracker.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TrackerService],
  controllers: [TrackerController],
})
export default class TrackerModule {}

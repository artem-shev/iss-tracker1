import { Controller, Get } from '@nestjs/common';
import TrackerService from './tracker.service';

@Controller()
export default class TrackerController {
  constructor(private trackerService: TrackerService) {}
  @Get('/current')
  getCurrentCoordinates() {
    return this.trackerService.getCurrentCoordinates();
  }
}

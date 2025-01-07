import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

const url = 'http://api.open-notify.org/iss-now.json';

@Injectable()
export default class TrackerService {
  private prevPositions = {};

  constructor(private httpService: HttpService) {}

  getCurrentCoordinates() {
    return this.httpService.get(url).pipe(
      map((data) => {
        this.prevPositions[data.data.timestamp] = data.data.iss_position;

        return {
          ...data.data.iss_position,
          timestamp: data.data.timestamp,
          history: this.prevPositions,
        };
      }),
    );
  }
}

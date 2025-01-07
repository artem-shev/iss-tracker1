import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import {
  calculateVelocity,
  mapResponseToData,
} from 'src/modules/tracker/helpers';

export const issNowUrl = 'http://api.open-notify.org/iss-now.json';

@Injectable()
export default class TrackerService {
  private history = [];

  constructor(private httpService: HttpService) {}

  getCurrentCoordinates() {
    return this.httpService.get(issNowUrl).pipe(
      map((data) => {
        const currentLocation = mapResponseToData(data.data);

        currentLocation.velocity = calculateVelocity(
          this.history.at(-1),
          currentLocation,
        );

        this.history.push(currentLocation);

        return this.history;
      }),
    );
  }
}

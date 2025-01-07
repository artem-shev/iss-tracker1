import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { calculateVelocity } from 'src/modules/tracker/helpers';

const url = 'http://api.open-notify.org/iss-now.json';

@Injectable()
export default class TrackerService {
  private history = [];

  constructor(private httpService: HttpService) {}

  getCurrentCoordinates() {
    return this.httpService.get(url).pipe(
      map((data) => {
        const currentLocation = {
          longitude: +data.data.iss_position.longitude,
          latitude: +data.data.iss_position.latitude,
          timestamp: data.data.timestamp,
          velocity: 0,
        };

        currentLocation.velocity = calculateVelocity(
          this.history.at(-1),
          currentLocation,
        ).velocity;

        this.history.push(currentLocation);

        return this.history;
      }),
    );
  }
}

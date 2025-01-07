import {
  calculateVelocity,
  calculateDistanceByCoords,
  GPSPoint,
  mapResponseToData,
} from './helpers';
import { map } from 'rxjs';

const point1: GPSPoint = {
  latitude: 37.7749,
  longitude: -122.4194,
  timestamp: 1700000000,
}; // San Francisco
const point2: GPSPoint = {
  latitude: 34.0522,
  longitude: -118.2437,
  timestamp: 1700003600,
}; // Los Angeles (1 hour later)

describe('Tracker.helpers', () => {
  it('should properly calculate distance between to pairs of coordinates', () => {
    expect(calculateDistanceByCoords(point1, point2)).toBe(559.1205770615533);
  });

  it('should properly calculate and round velocity by pair of coordinates and timestamps', () => {
    expect(calculateVelocity(point1, point2)).toBe(559);
  });

  it('should return 0 in case if first point was recorded after the second', () => {
    expect(calculateVelocity(point2, point1)).toBe(0);
  });

  it('should return 0 in case if both points was recorded in the same time', () => {
    expect(
      calculateVelocity({ ...point2, timestamp: point1.timestamp }, point1),
    ).toBe(0);
  });

  it('should return 0 in case of one missing points', () => {
    expect(calculateVelocity(point1, undefined)).toBe(0);
    expect(calculateVelocity(undefined, point1)).toBe(0);
  });

  it('should properly map response to data with default value for velocity', () => {
    expect(
      mapResponseToData({
        timestamp: point1.timestamp,
        iss_position: {
          longitude: point1.longitude.toString(),
          latitude: point1.latitude.toString(),
        },
      }),
    ).toEqual({ ...point1, velocity: 0 });
  });
});

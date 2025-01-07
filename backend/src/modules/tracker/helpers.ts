export interface GPSPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const calculateDistanceByCoords = (
  point1: GPSPoint,
  point2: GPSPoint,
) => {
  const R = 6371; // Earth's radius in km
  const toRadians = (deg: number) => deg * (Math.PI / 180);

  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLon = toRadians(point2.longitude - point1.longitude);
  const lat1Rad = toRadians(point1.latitude);
  const lat2Rad = toRadians(point2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

export const calculateVelocity = (point1: GPSPoint, point2: GPSPoint) => {
  if (!point1 || !point2) return 0;

  const distance = calculateDistanceByCoords(point1, point2);
  const timeInSeconds = point2.timestamp - point1.timestamp;

  if (timeInSeconds <= 0) {
    return 0; // Avoid division by zero
  }

  return Math.round((distance / timeInSeconds) * 3600); // Convert km to km/h
};

export const mapResponseToData = (data: {
  iss_position: { longitude: string; latitude: string };
  timestamp: number;
}) => ({
  longitude: +data.iss_position.longitude,
  latitude: +data.iss_position.latitude,
  timestamp: data.timestamp,
  velocity: 0,
});

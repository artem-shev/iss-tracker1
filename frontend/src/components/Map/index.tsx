import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Tracker from 'components/Tracker';
import { forwardRef } from 'react';

interface Props {
  latitude?: string;
  longitude?: string;
}

const Map = ({ latitude = '51.505', longitude = '-0.09' }: Props, ref: any) => {
  const position = { lat: +latitude, lng: +longitude };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '300px', width: '600px' }}
        ref={ref}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>ISS</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default forwardRef(Map);

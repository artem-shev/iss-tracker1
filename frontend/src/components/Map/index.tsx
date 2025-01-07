import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Map as LeafletMap } from 'leaflet';

interface Props {
  latitude?: number;
  longitude?: number;
  children: ReactNode;
}

const Map = (
  { latitude = 51.505, longitude = -0.09, children }: Props,
  ref: ForwardedRef<LeafletMap>,
) => {
  const position = { lat: latitude, lng: longitude };

  return (
    <MapContainer
      center={position}
      zoom={3}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '100%' }}
      // @ts-ignore
      ref={ref}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
    </MapContainer>
  );
};

export default forwardRef<LeafletMap, Props>(Map);

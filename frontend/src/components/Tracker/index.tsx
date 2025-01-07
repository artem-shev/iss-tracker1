import { useQuery } from 'react-query';
import api from 'utils/api';
import Map from 'components/Map';
import React, { useRef } from 'react';
import { Map as LeafletMap } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

type Response = { latitude: number; longitude: number; timestamp: number; velocity: number }[];

const interval = 20000;

const Tracker = () => {
  const ref = useRef<LeafletMap>(null);
  const { data, refetch } = useQuery(
    'current',
    ({ signal }) => api.get<Response>('/current', { signal }),
    {
      refetchInterval: interval,
      onSuccess(data) {
        const current = data.data.at(-1);
        if (current) {
          ref.current?.panTo([current.latitude, current.longitude]);
        }
      },
    },
  );

  const current = data?.data.at(-1);
  const position = current ? { lat: current?.latitude, lng: current?.longitude } : undefined;

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => refetch()}>refetch</button>
      <Map {...position} ref={ref}>
        {position && (
          <>
            <Marker position={position} key={JSON.stringify(position)}>
              <Popup>ISS</Popup>
            </Marker>
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1000,
                background: 'white',
              }}
            >
              <div>Latitude: {current?.latitude}</div>
              <div>Longitude: {current?.longitude}</div>
              <div>Velocity: {current?.velocity}</div>
            </div>
          </>
        )}
      </Map>
      ;
    </div>
  );
};

export default Tracker;

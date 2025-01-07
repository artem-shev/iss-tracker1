import { useQuery } from 'react-query';
import api from 'utils/api';
import Map from 'components/Map';
import React, { useRef } from 'react';
import Leaflet, { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import {
  StyledButton,
  StyledInfoPanel,
  StyledPanelTitle,
  StyledWrapper,
} from 'components/Tracker/styled';
import dayjs from 'dayjs';

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

        if (data.data.length > 1) {
          const coords = data.data.map(({ latitude, longitude }) => [latitude, longitude]);

          Leaflet.polyline(coords as LatLngExpression[], { color: 'red' }).addTo(ref.current!);
        }
      },
    },
  );

  const current = data?.data.at(-1);
  const position = current ? { lat: current?.latitude, lng: current?.longitude } : undefined;

  return (
    <div>
      <StyledWrapper>
        <h4>ISS Tracker</h4>
        <StyledButton onClick={() => refetch()}>refetch</StyledButton>
      </StyledWrapper>
      <Map {...position} ref={ref}>
        {position && (
          <>
            <Marker position={position} key={JSON.stringify(position)}>
              <Popup>ISS</Popup>
            </Marker>
            <StyledInfoPanel>
              <StyledPanelTitle>ISS</StyledPanelTitle>
              <div>Latitude: {current?.latitude}</div>
              <div>Longitude: {current?.longitude}</div>
              <div>Velocity: {current?.velocity}</div>
              <div>Updated: {dayjs.unix(current?.timestamp!).format('hh:mm:ss')}</div>
            </StyledInfoPanel>
          </>
        )}
      </Map>
    </div>
  );
};

export default Tracker;

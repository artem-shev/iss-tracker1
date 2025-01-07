import { useQuery } from 'react-query';
import api from 'utils/api';
import Map from 'components/Map';
import { useRef } from 'react';
import { Map as LeafletMap } from 'leaflet';

interface Response {
  latitude: string;
  longitude: string;
  timestamp: number;
  history: Record<string, { latitude: string; longitude: string }>;
}

const interval = 20000;

const Tracker = () => {
  const ref = useRef<LeafletMap>();
  const { data, refetch } = useQuery(
    'current',
    ({ signal }) => api.get<Response>('/current', { signal }),
    {
      refetchInterval: interval,
      onSuccess(data) {
        ref.current?.panTo([+data.data.latitude, +data.data.longitude]);
      },
    },
  );

  return (
    <div>
      <button onClick={() => refetch()}>refetch</button>
      <Map {...data?.data} ref={ref} />;
    </div>
  );
};

export default Tracker;

/// <reference types="react-scripts" />

declare global {
  import L from 'leaflet';

  interface Window {
    L: L;
  }
}

import { LatLngExpression } from 'leaflet';

export type TMarker = {
  id: string;
  name: string;
  icon: string;
  description: string;
  img: Array<string>;
  images: Array<any>;
  position: LatLngExpression;
  color: string;
  location: string;
};

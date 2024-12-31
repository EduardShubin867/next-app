import { LatLngExpression } from 'leaflet';
import { ObjectId } from 'mongodb';

export interface ImageFile extends File {
  url: string;
  id: string;
}

export type TMarker = {
  _id?: ObjectId;
  id: string;
  name: string;
  icon: string;
  description: string;
  images: Array<string>;
  position: LatLngExpression;
  color: string;
  location: string;
};

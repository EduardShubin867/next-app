import { LatLngExpression } from 'leaflet';

export interface ImageFile extends File {
    url: string;
    id: string;
}

export type TMarker = {
    id: string;
    name: string;
    icon: string;
    description: string;
    images: Array<ImageFile>;
    position: LatLngExpression;
    color: string;
    location: string;
};

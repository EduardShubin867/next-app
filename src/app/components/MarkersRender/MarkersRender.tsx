'use client';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import uuid from 'react-uuid';

import MarkerPopup from '../MarkerPopup/MarkerPopup';
import MarkerPopupEdit from '../MarkerPopupEdit/MarkerPopupEdit';
import { getMarkers } from '@/app/lib/actions';
import { TMarker } from '@/types/TMarker';

import '../Controls/MarkerColorOptions/markerColor.css';

interface MarkersRenderProp {
  mapEdit: boolean;
  location: string;
}

const MarkersRender = ({ mapEdit, location }: MarkersRenderProp) => {
  const markers: TMarker[] = [
    {
      id: '66235586ba57c6d72560d855',
      name: 'dawd',
      icon: 'location_on_black_24dp',
      description: 'Some Description',
      position: [2.5, 7.2],
      img: [
        '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
        '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
        '/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg',
      ],
      images: ['/assets/images/Default_A_towering_medieval_castle_stands_majestically_atop_a_0.jpg'],
      color: 'black',
      location: 'Some Location',
    },
  ];

  const markerIcon = (icon: string, color: string) => {
    return L.icon({
      iconUrl: `/assets/images/icons/${icon}.svg`,
      iconSize: [32, 32],
      className: `marker-color--${color}`,
    });
  };

  return markers?.map((marker: TMarker) => (
    <Marker key={uuid()} position={marker.position} icon={markerIcon(marker.icon, marker.color)}>
      <Popup minWidth={310} maxWidth={310} maxHeight={400}>
        {mapEdit ? <MarkerPopupEdit marker={marker} location={location} /> : <MarkerPopup marker={marker} />}
      </Popup>
    </Marker>
  ));
};

export default MarkersRender;

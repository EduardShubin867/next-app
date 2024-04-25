'use client';

import React, { useRef, Dispatch, SetStateAction } from 'react';
import { LatLngExpression } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import Image from 'next/image';
import { ImageFile } from '@/types/TMarker';
import ImageCarousel from '../../ImageCarousel/ImageCarousel';

type TImage = {
  name: string;
};

interface Props {
  newPosition: LatLngExpression;
  setNewPosition: Dispatch<SetStateAction<LatLngExpression>>;
  newMarkerIcon: string;
  newMarkerName: string;
  newMarkerDescription: string;
  newMarkerImg: Array<ImageFile>;
  color: string;
}

const NewMarker = ({
  newPosition,
  setNewPosition,
  newMarkerIcon,
  newMarkerName,
  newMarkerDescription,
  newMarkerImg,
  color,
}: Props) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setNewPosition([lat, lng]);
    },
  });

  const markerIcon = L.icon({
    iconUrl: `/assets/images/icons/${newMarkerIcon}.svg`,
    iconSize: [32, 32],
    className: `marker-color--${color}`,
  });

  return newPosition ? (
    <Marker position={newPosition} icon={markerIcon}>
      <Popup className="marker-popup">
        <div className="new-marker-popup block justify-center p-0">
          <h3 className={`m-2 text-center ${newMarkerName ? '' : 'text-gray-500'}`}>{newMarkerName || 'Название'}</h3>

          <hr className="my-2" />

          {newMarkerImg && newMarkerImg.length > 0 ? (
            <ImageCarousel images={newMarkerImg} />
          ) : (
            <div className="h-24 bg-gray-300" /> // Placeholder box if no image
          )}

          <div className="mb-2 mt-2 pl-1 pr-1 text-sm">
            {newMarkerDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export default NewMarker;

'use client';

import clsx from 'clsx';
import L from 'leaflet';
import { useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import { MarkersContext } from '@/context/MarkersContext';

import ImageCarousel from '../../ImageCarousel/ImageCarousel';

const NewMarker = () => {
  const {
    newPosition,
    setNewPosition,
    newMarkerIcon,
    newMarkerColor,
    newMarkerName,
    newMarkerImage,
    newMarkerDescription,
  } = useContext(MarkersContext);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setNewPosition([lat, lng]);
    },
  });

  const markerIcon = L.divIcon({
    html: `<i class="${newMarkerIcon} fa-2x" style="color:${newMarkerColor}"></i>`,
    popupAnchor: [4, 1],
    className: 'marker-icon',
  });

  return newPosition ? (
    <Marker position={newPosition} icon={markerIcon}>
      <Popup className="marker-popup">
        <div className="flex min-h-min flex-col items-center p-1">
          <h3
            className={clsx(
              `mt-1 w-10/12 text-center text-xl font-semibold`,
              newMarkerName
                ? 'text-black'
                : 'pointer-events-none select-none text-gray-500'
            )}
          >
            {newMarkerName || 'Название'}
          </h3>

          <hr className="my-2 h-px w-5/6 border-0 bg-gray-200 dark:bg-gray-700" />

          {newMarkerImage && newMarkerImage.new.length > 0 ? (
            <ImageCarousel images={newMarkerImage.new} />
          ) : (
            <div className="size-[295px] animate-pulse rounded bg-gray-300" />
          )}

          <div
            className={clsx(
              `my-2 block min-h-min min-w-[295px] max-w-full text-base font-medium antialiased`,
              newMarkerDescription
                ? 'text-black'
                : 'pointer-events-none select-none text-gray-500'
            )}
          >
            {newMarkerDescription ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export default NewMarker;

'use client';

import {
  LatLngBoundsExpression,
  LatLngExpression,
  LatLngBounds,
} from 'leaflet';
import { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';

import Controls from '@/app/components/Controls/Controls';
import MarkersRender from '@/app/components/MarkersRender/MarkersRender';

import 'leaflet/dist/leaflet.css';
import './mapStyles.css';

type MapProps = {
  customImage: StaticImageData;
};

interface PanRestrictProps {
  bounds: LatLngBoundsExpression;
}

const PureControls = memo(Controls);

const Map = ({ customImage }: MapProps) => {
  const isAdmin = true;

  const [mapEdit, setMapEdit] = useState(true);
  const pathname = usePathname();

  const trimmedPathname = useMemo(() => {
    return pathname.slice(1);
  }, [pathname]);

  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [9, 16],
  ];

  const center: LatLngExpression = [2.5, 7.2];

  const handleSwitchChange = useCallback(() => {
    setMapEdit(!mapEdit);
  }, [mapEdit]);

  return (
    <div id="map" className="z-40 h-screen">
      <MapContainer
        center={center}
        zoom={8}
        maxZoom={10}
        minZoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <ImageOverlay url={customImage.src} bounds={bounds} />
        <MarkersRender mapEdit={mapEdit} location={pathname} />

        {isAdmin ? (
          <PureControls
            mapEdit={mapEdit}
            handleSwitchChange={handleSwitchChange}
            location={trimmedPathname}
          />
        ) : null}
        <PanRestrict bounds={bounds} />
      </MapContainer>
    </div>
  );
};

// Ограничение перемещения за пределы карты
const PanRestrict = ({ bounds }: PanRestrictProps) => {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(bounds);

    const handleDrag = () => {
      let north, east, south, west;

      if (Array.isArray(bounds) && bounds.length === 2) {
        north = bounds[0][0];
        east = bounds[0][1];
        south = bounds[1][0];
        west = bounds[1][1];
      } else if (bounds instanceof LatLngBounds) {
        north = bounds.getNorth();
        east = bounds.getEast();
        south = bounds.getSouth();
        west = bounds.getWest();
      } else {
        console.error('Unsupported bounds type for PanRestrict');
        return;
      }

      if (
        map.getBounds().getNorth() < north ||
        map.getBounds().getEast() < east ||
        map.getBounds().getSouth() > south ||
        map.getBounds().getWest() > west
      ) {
        map.panInsideBounds(bounds);
      }
    };

    map.on('drag', handleDrag);

    // Cleanup function
    return () => {
      map.off('drag', handleDrag);
    };
  }, [map, bounds]); // Only re-run the effect if map or bounds change

  return null;
};
export default Map;

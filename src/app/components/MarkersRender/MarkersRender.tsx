'use client';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useContext } from 'react';

import uuid from 'react-uuid';

import MarkerPopup from '../MarkerPopup/MarkerPopup';
import MarkerPopupEdit from '../MarkerPopupEdit/MarkerPopupEdit';
import { TMarker } from '@/types/TMarker';
import { MarkersContext } from '@/context/MarkersContext';

import '../Controls/MarkerColorOptions/markerColor.css';

interface MarkersRenderProp {
    mapEdit: boolean;
    location: string;
}

const MarkersRender = ({ mapEdit, location }: MarkersRenderProp) => {
    const { markers } = useContext(MarkersContext);

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

'use client';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useContext } from 'react';

import uuid from 'react-uuid';

import MarkerPopup from '../MarkerPopup/MarkerPopup';
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
        return L.divIcon({
            html: `<i class="${icon} fa-2x" style="color:${color}"></i>`,
            popupAnchor: [4, 1],
            className: 'marker-icon',
        });
    };

    return markers?.map((marker: TMarker) => (
        <Marker key={uuid()} position={marker.position} icon={markerIcon(marker.icon, marker.color)}>
            <Popup minWidth={310} maxWidth={310} maxHeight={600} interactive={true} className="!cursor-default">
                <MarkerPopup marker={marker} mapEdit={mapEdit} />
            </Popup>
        </Marker>
    ));
};

export default MarkersRender;

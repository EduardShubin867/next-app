'use client';

import React, { useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import ImageCarousel from '../../ImageCarousel/ImageCarousel';
import { NewMarkerContext } from '@/context/NewMarkerContext';

const NewMarker = () => {
    const {
        newPosition,
        setNewPosition,
        newMarkerIcon,
        newMarkerColor,
        newMarkerName,
        newMarkerImage,
        newMarkerDescription,
    } = useContext(NewMarkerContext);
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setNewPosition([lat, lng]);
        },
    });

    const markerIcon = L.divIcon({
        html: `<i class="fa-solid fa-location-dot fa-2x" style="color:#0000ff"></i>`,
        popupAnchor: [4, 1],
        className: 'marker-icon',
    });

    return newPosition ? (
        <Marker position={newPosition} icon={markerIcon}>
            <Popup className="marker-popup">
                <div className="new-marker-popup block justify-center p-0">
                    <h3 className={`m-2 text-center ${newMarkerName ? '' : 'text-gray-500'}`}>
                        {newMarkerName || 'Название'}
                    </h3>

                    <hr className="my-2" />

                    {newMarkerImage && newMarkerImage.length > 0 ? (
                        <ImageCarousel images={newMarkerImage} />
                    ) : (
                        <div className="h-[301px] bg-gray-300" /> // Placeholder box if no image
                    )}

                    <div className="my-2 px-1 text-sm">
                        {newMarkerDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
                    </div>
                </div>
            </Popup>
        </Marker>
    ) : null;
};

export default NewMarker;

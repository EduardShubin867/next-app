import React, { createContext, useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { ImageFile } from '@/types/TMarker';
import { v4 as uuid } from 'uuid';

import { addMarker, getMarkers, updateMarker } from '@/app/lib/actions';

import { TMarker } from '@/types/TMarker';

interface ContextValue {
    markers: Array<TMarker>;
    setMarkers: React.Dispatch<React.SetStateAction<Array<TMarker>>>;
    newPosition: LatLngExpression;
    setNewPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
    newMarkerName: string;
    setNewMarkerName: React.Dispatch<React.SetStateAction<string>>;
    newMarkerDescription: string;
    setNewMarkerDescription: React.Dispatch<React.SetStateAction<string>>;
    newMarkerImage: ImageFile[];
    setNewMarkerImage: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    newMarkerIcon: string;
    setNewMarkerIcon: React.Dispatch<React.SetStateAction<string>>;
    newMarkerColor: string;
    setNewMarkerColor: React.Dispatch<React.SetStateAction<string>>;
    handleAddMarker: (event: React.SyntheticEvent) => Promise<void>;
    handleRemoveImage: (imageId: string) => void;
    handleMarkerUpdate: (marker: TMarker) => void;
}

const initialValue: ContextValue = {
    markers: [],
    setMarkers: () => {},
    newPosition: [0, 0],
    setNewPosition: () => {},
    newMarkerName: '',
    setNewMarkerName: () => {},
    newMarkerDescription: '',
    setNewMarkerDescription: () => {},
    newMarkerImage: [],
    setNewMarkerImage: () => {},
    newMarkerIcon: 'fa-solid fa-location-dot',
    setNewMarkerIcon: () => {},
    newMarkerColor: 'black',
    setNewMarkerColor: () => {},
    handleAddMarker: async () => {},
    handleRemoveImage: () => {},
    handleMarkerUpdate: () => {},
};

export const MarkersContext = createContext<ContextValue>(initialValue);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [markers, setMarkers] = useState<Array<TMarker>>([]);
    const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0]);
    const [newMarkerName, setNewMarkerName] = useState('');
    const [newMarkerDescription, setNewMarkerDescription] = useState('');
    const [newMarkerImage, setNewMarkerImage] = useState<ImageFile[]>([]);
    const [newMarkerIcon, setNewMarkerIcon] = useState<string>('fa-solid fa-location-dot');
    const [newMarkerColor, setNewMarkerColor] = useState<string>('black');

    const location = 'krasnoe-bedstvie';

    useEffect(() => {
        const fetchMarkers = async () => {
            setMarkers(JSON.parse(await getMarkers()));
        };

        fetchMarkers();
    }, []);

    const handleMarkerUpdate = async (marker: TMarker) => {
        try {
            const res = JSON.parse(await updateMarker(marker));
            if (!res.success) {
                throw new Error(`HTTP error! status: ${res.message}`);
            }
            setMarkers((prev) => prev.map((prevMarker) => (prevMarker.id === marker.id ? marker : prevMarker)));
        } catch (error) {
            console.log(`Возникла ошибка обновления маркера ${error}`);
        }

        console.log(marker);
    };

    const handleAddMarker = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newMarker: TMarker = {
            id: uuid(),
            name: newMarkerName,
            icon: newMarkerIcon,
            description: newMarkerDescription,
            images: newMarkerImage || [],
            position: newPosition,
            color: newMarkerColor,
            location: location,
        };

        const markerData = new FormData();
        const markerFiles = new FormData();

        markerData.append('id', newMarker.id);
        markerData.append('name', newMarker.name);
        markerData.append('icon', newMarker.icon);
        markerData.append('description', newMarker.description);
        markerData.append('position', JSON.stringify(newMarker.position));
        markerData.append('color', newMarker.color);
        markerData.append('location', newMarker.location);

        newMarker.images.forEach((img, index) => {
            markerFiles.append(`images[]`, img);
        });

        try {
            const response = JSON.parse(await addMarker(markerData, markerFiles));
            setMarkers((prev) => [...prev, response]);
            setNewMarkerName('');
            setNewMarkerDescription('');
            setNewMarkerImage([]);
            setNewMarkerIcon('fa-solid fa-location-dot');
            setNewPosition([0, 0]);
        } catch (error) {
            console.log('Error on adding marker');
        }
    };

    const handleRemoveImage = (imageId: string) => {
        setNewMarkerImage((prevImages) => prevImages.filter((image) => image.id !== imageId));
    };

    const value: ContextValue = {
        markers,
        setMarkers,
        newPosition,
        setNewPosition,
        newMarkerName,
        setNewMarkerName,
        newMarkerDescription,
        setNewMarkerDescription,
        newMarkerImage,
        setNewMarkerImage,
        newMarkerIcon,
        setNewMarkerIcon,
        newMarkerColor,
        setNewMarkerColor,
        handleAddMarker,
        handleRemoveImage,
        handleMarkerUpdate,
    };

    return <MarkersContext.Provider value={value}>{children}</MarkersContext.Provider>;
};

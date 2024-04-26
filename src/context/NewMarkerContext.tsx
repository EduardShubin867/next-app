import React, { createContext, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { ImageFile } from '@/types/TMarker';
import { v4 as uuid } from 'uuid';

import { TMarker } from '@/types/TMarker';

interface ContextValue {
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
}

const initialValue: ContextValue = {
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
};

export const NewMarkerContext = createContext<ContextValue>(initialValue);

export const NewMarkerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0]);
    const [newMarkerName, setNewMarkerName] = useState('');
    const [newMarkerDescription, setNewMarkerDescription] = useState('');
    const [newMarkerImage, setNewMarkerImage] = useState<ImageFile[]>([]);
    const [newMarkerIcon, setNewMarkerIcon] = useState<string>('fa-solid fa-location-dot');
    const [newMarkerColor, setNewMarkerColor] = useState<string>('black');
    const location = 'krasnoe-bedstvie';

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

        try {
            setNewMarkerName('');
            setNewMarkerDescription('');
            setNewMarkerImage([]);
            setNewMarkerIcon('location_on_black_24dp');
            setNewPosition([0, 0]);
        } catch (error) {
            console.error('Failed to save marker: ', error);
        }
    };

    const handleRemoveImage = (imageId: string) => {
        setNewMarkerImage((prevImages) => prevImages.filter((image) => image.id !== imageId));
    };

    const value: ContextValue = {
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
    };

    return <NewMarkerContext.Provider value={value}>{children}</NewMarkerContext.Provider>;
};

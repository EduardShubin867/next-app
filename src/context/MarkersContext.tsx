import React, { createContext, useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { ImageFile } from '@/types/TMarker';
import { v4 as uuid } from 'uuid';

import { addMarker, getMarkers, removeMarker, updateMarker } from '@/app/lib/actions';

import { TMarker } from '@/types/TMarker';

interface EditImages {
    old: string[];
    new: ImageFile[];
}

interface ContextValue {
    markers: Array<TMarker>;
    setMarkers: React.Dispatch<React.SetStateAction<Array<TMarker>>>;
    newPosition: LatLngExpression;
    setNewPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
    newMarkerName: string;
    setNewMarkerName: React.Dispatch<React.SetStateAction<string>>;
    newMarkerDescription: string;
    setNewMarkerDescription: React.Dispatch<React.SetStateAction<string>>;
    newMarkerImage: EditImages;
    setNewMarkerImage: React.Dispatch<React.SetStateAction<EditImages>>;
    newMarkerIcon: string;
    setNewMarkerIcon: React.Dispatch<React.SetStateAction<string>>;
    newMarkerColor: string;
    setNewMarkerColor: React.Dispatch<React.SetStateAction<string>>;
    handleAddMarker: (event: React.SyntheticEvent) => Promise<void>;
    handleRemoveImage: (imageId: string | ImageFile) => void;
    handleMarkerUpdate: (marker: TMarker) => void;
    handleRemoveMarker: (marker: TMarker) => void;
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
    newMarkerImage: { old: [], new: [] },
    setNewMarkerImage: () => {},
    newMarkerIcon: 'fa-solid fa-location-dot',
    setNewMarkerIcon: () => {},
    newMarkerColor: 'black',
    setNewMarkerColor: () => {},
    handleAddMarker: async () => {},
    handleRemoveImage: () => {},
    handleMarkerUpdate: () => {},
    handleRemoveMarker: () => {},
};

export const MarkersContext = createContext<ContextValue>(initialValue);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [markers, setMarkers] = useState<Array<TMarker>>([]);
    const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0]);
    const [newMarkerName, setNewMarkerName] = useState('');
    const [newMarkerDescription, setNewMarkerDescription] = useState('');
    const [newMarkerImage, setNewMarkerImage] = useState<EditImages>({ old: [], new: [] });
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
    };

    const handleAddMarker = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newMarker: TMarker = {
            id: uuid(),
            name: newMarkerName,
            icon: newMarkerIcon,
            description: newMarkerDescription,
            images: newMarkerImage.old || [],
            position: newPosition,
            color: newMarkerColor,
            location: location,
        };

        const markerFiles = new FormData();

        newMarkerImage.new.forEach((img, index) => {
            markerFiles.append(`images[]`, img);
        });

        try {
            const response = JSON.parse(await addMarker(JSON.stringify(newMarker), markerFiles));
            setMarkers((prev) => [...prev, response]);
            setNewMarkerName('');
            setNewMarkerDescription('');
            setNewMarkerImage({ old: [], new: [] });
            setNewMarkerIcon('fa-solid fa-location-dot');
            setNewPosition([0, 0]);
        } catch (error) {
            console.log('Error on adding marker');
        }
    };

    const handleRemoveImage = (image: ImageFile | string) => {
        setNewMarkerImage((prevImages) => {
            if (image instanceof File) {
                return {
                    ...prevImages,
                    new: prevImages.new.filter((prevImage) => prevImage.id !== image.id),
                };
            } else {
                return {
                    ...prevImages,
                    old: prevImages.old.filter((prevImage) => prevImage !== image),
                };
            }
        });
    };

    const handleRemoveMarker = async (marker: TMarker) => {
        try {
            const response = JSON.parse(await removeMarker(marker.id, location, marker.images));
            if (!response.success) {
                throw new Error(`Deleting marker error: ${response.message}`);
            }
            setMarkers((prev) => prev.filter((prevMarker) => prevMarker.id != marker.id));
        } catch (error) {
            console.log(error);
        }
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
        handleRemoveMarker,
    };

    return <MarkersContext.Provider value={value}>{children}</MarkersContext.Provider>;
};

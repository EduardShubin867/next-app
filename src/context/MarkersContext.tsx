import { LatLngExpression } from 'leaflet';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import {
  addMarker,
  getMarkers,
  removeMarker,
  updateMarker,
} from '@/app/lib/actions';
import { ImageFile } from '@/types/TMarker';
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
  loadingDeleteMarker: boolean;
  setLoadingDeleteMarker: React.Dispatch<React.SetStateAction<boolean>>;
  loadingUpdateMarker: boolean;
  setLoadingUpdateMarker: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddMarker: (event: React.SyntheticEvent) => Promise<void>;
  handleRemoveImage: (imageId: string | ImageFile) => void;
  handleMarkerUpdate: (marker: TMarker, images: ImageFile[]) => void;
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
  loadingDeleteMarker: false,
  setLoadingDeleteMarker: () => {},
  loadingUpdateMarker: false,
  setLoadingUpdateMarker: () => {},
};

export const MarkersContext = createContext<ContextValue>(initialValue);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [markers, setMarkers] = useState<Array<TMarker>>([]);
  const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0]);
  const [newMarkerName, setNewMarkerName] = useState('');
  const [newMarkerDescription, setNewMarkerDescription] = useState('');
  const [newMarkerImage, setNewMarkerImage] = useState<EditImages>({
    old: [],
    new: [],
  });
  const [newMarkerIcon, setNewMarkerIcon] = useState<string>(
    'fa-solid fa-location-dot'
  );
  const [newMarkerColor, setNewMarkerColor] = useState<string>('black');
  const [loadingDeleteMarker, setLoadingDeleteMarker] =
    useState<boolean>(false);
  const [loadingUpdateMarker, setLoadingUpdateMarker] =
    useState<boolean>(false);

  const location = 'krasnoe-bedstvie';

  useEffect(() => {
    const fetchMarkers = async () => {
      setMarkers(JSON.parse(await getMarkers()));
    };

    fetchMarkers();
  }, []);

  const handleMarkerUpdate = async (
    marker: TMarker,
    editImage: ImageFile[]
  ) => {
    setLoadingUpdateMarker(true);
    const imageFiles = new FormData();
    editImage.forEach((img) => {
      imageFiles.append(`images[]`, img);
    });

    try {
      const res = JSON.parse(await updateMarker(marker, imageFiles));

      if (!res.success) {
        toast.error(`Маркер ${marker.name} не обновлен: ${res.message}`);
        throw new Error(`HTTP error! status: ${res.message}`);
      }

      toast.info(`Маркер ${marker.name} обновлен`);
      setLoadingUpdateMarker(false);
      setMarkers((prev) =>
        prev.map((prevMarker) =>
          prevMarker.id === marker.id ? res.data : prevMarker
        )
      );
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

    newMarkerImage.new.forEach((img) => {
      markerFiles.append(`images[]`, img);
    });

    try {
      const response = JSON.parse(
        await addMarker(JSON.stringify(newMarker), markerFiles)
      );
      if (!response.success) {
        toast.error(`Ошбика добавления маркера: ${response.message}`);
        throw new Error(`Adding marker error: ${response.message}`);
      }

      setMarkers((prev) => [...prev, response.data]);
      toast.success(`Маркер ${response.data.name} добавлен`);

      setNewMarkerName('');
      setNewMarkerDescription('');
      setNewMarkerImage({ old: [], new: [] });
      setNewMarkerIcon('fa-solid fa-location-dot');
      setNewPosition([2.5, 7.2]);
    } catch (error) {
      console.log('Error on adding marker:', error);
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
    setLoadingDeleteMarker(true);
    try {
      const response = JSON.parse(await removeMarker(marker.id, marker.images));
      if (!response.success) {
        toast.error(`Ошбика удаления маркера: ${response.message}`);
        throw new Error(`Deleting marker error: ${response.message}`);
      }

      toast.success(`Маркер ${marker.name} удален`);
      setLoadingDeleteMarker(false);
      setMarkers((prev) =>
        prev.filter((prevMarker) => prevMarker.id != marker.id)
      );
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
    loadingDeleteMarker,
    setLoadingDeleteMarker,
    loadingUpdateMarker,
    setLoadingUpdateMarker,
  };

  return (
    <MarkersContext.Provider value={value}>{children}</MarkersContext.Provider>
  );
};

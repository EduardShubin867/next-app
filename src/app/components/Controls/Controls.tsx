'use client';

import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import L, { LatLngExpression } from 'leaflet';
import uuid from 'react-uuid';
import { Label, TextInput, Textarea, FileInput } from 'flowbite-react';

import { TMarker, ImageFile } from '@/types/TMarker';

import NewMarker from './NewMarker/NewMarker';
import MarkerIcon from './MarkerIcon/MarkerIcon';
import MarkerColorOptions from './MarkerColorOptions/MarkerColorOptions';
import ImageDownload from './ImageDownload/ImageDownload';

type Props = {
  mapEdit: boolean;
  handleSwitchChange: () => void;
  location: string;
};

const Controls = ({ mapEdit, handleSwitchChange, location }: Props) => {
  const containerRef = useRef(null);
  console.log('Rerender');

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  const [newPosition, setNewPosition] = useState<LatLngExpression>([0, 0]);
  const [newMarkerName, setNewMarkerName] = useState('');
  const [newMarkerDescription, setNewMarkerDescription] = useState('');
  const [newMarkerImage, setNewMarkerImage] = useState<Array<ImageFile>>([]);
  const [newMarkerIcon, setNewMarkerIcon] = useState<string>('location_on_black_24dp');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(true);
  const [color, setColor] = useState<string>('black');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  //Add marker handle function
  const handleAddMarker = async (event: SyntheticEvent) => {
    event.preventDefault();
    setValidated(true);

    if (!newPosition) {
      return;
    }

    if (imageError) {
      return;
    }

    const newMarker: TMarker = {
      id: uuid(),
      name: newMarkerName,
      icon: newMarkerIcon,
      description: newMarkerDescription,
      images: newMarkerImage || [],
      position: newPosition,
      color: color,
      location: location,
    };

    try {
      setAddRequestStatus('pending');

      setNewMarkerName('');
      setNewMarkerDescription('');
      setNewMarkerImage([]);
      setNewMarkerIcon('location_on_black_24dp');
      setNewPosition([0, 0]);
      setValidated(false);
      setError('');
    } catch (error) {
      console.error('Failed to save marker: ', error);
    } finally {
      setAddRequestStatus('idle');
    }
  };

  useEffect(() => {
    if (!newPosition) {
      setError('Пожалуйста, установите маркер');
    } else {
      setError('');
    }
  }, [newPosition]);

  useEffect(() => {
    if (!(newMarkerImage && !(newMarkerImage.length === 0))) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }, [newMarkerImage]);

  return (
    <div>
      {mapEdit ? (
        <NewMarker
          newPosition={newPosition}
          setNewPosition={setNewPosition}
          newMarkerIcon={newMarkerIcon}
          newMarkerName={newMarkerName}
          newMarkerDescription={newMarkerDescription}
          newMarkerImg={newMarkerImage}
          color={color}
        />
      ) : null}
      <div className="leaflet-top leaflet-right" ref={containerRef}>
        <div className="leaflet-control leaflet-bar control-switch">
          <div className="absolute right-2 top-4">
            <label className="mb-5 inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" checked={mapEdit} onChange={handleSwitchChange} />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
          {mapEdit ? (
            <div className="relative top-10">
              <div className="popover popover-bottom">
                <div className="popover-body mt-2 max-h-[800px] w-[350px] p-0">
                  <div className="w-full max-w-sm overflow-auto rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-3 md:p-4">
                    <form noValidate onSubmit={handleAddMarker} className="mx-auto max-w-sm">
                      <div>
                        <label htmlFor="newMarkerName">Иконка маркера</label>
                        <div className="mb-1 flex justify-center">
                          <MarkerIcon setNewMarkerIcon={setNewMarkerIcon} newMarkerIcon={newMarkerIcon} color={color} />
                        </div>
                        <MarkerColorOptions color={color} setColor={setColor} />
                      </div>

                      <div className="mb-5">
                        <div className="mb-2 block">
                          <Label htmlFor="newMarkerName" value="Название маркера" />
                        </div>
                        <TextInput
                          value={newMarkerName}
                          onChange={(e) => setNewMarkerName(e.target.value)}
                          id="newMarkerName"
                          type="text"
                          sizing="md"
                        />
                      </div>

                      <div className="mb-5">
                        <div className="max-w-md">
                          <div className="mb-2 block">
                            <Label htmlFor="newMarkerDescription" value="Описание маркера" />
                          </div>
                          <Textarea
                            id="newMarkerDescription"
                            placeholder="Введите описание..."
                            required
                            rows={4}
                            value={newMarkerDescription}
                            onChange={(e) => setNewMarkerDescription(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <ImageDownload setNewMarkerImage={setNewMarkerImage} newMarkerImage={newMarkerImage} />

                        {imageError && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Пожалуйста загрузите изображение!
                          </p>
                        )}
                      </div>
                      {error && <div className="alert alert-error">{error}</div>}
                      <button
                        type="submit"
                        className="my-2 me-2 w-full rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                        disabled={addRequestStatus === 'pending'}
                      >
                        Добавить маркер
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Controls;

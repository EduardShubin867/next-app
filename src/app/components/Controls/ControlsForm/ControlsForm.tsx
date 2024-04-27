import { useContext, SyntheticEvent } from 'react';

import CustomTextInput from '@/app/components/CustomTextInput/CustomTextInput';
import CustomTextArea from '@/app/components/CustomTextArea/CustomTextArea';
import MarkerIcon from '@/app/components/Controls/MarkerIcon/MarkerIcon';
import MarkerColorOptions from '@/app/components/Controls/MarkerColorOptions/MarkerColorOptions';
import ImageDownload from '@/app/components/Controls/ImageDownload/ImageDownload';

import { TMarker } from '@/types/TMarker';

import { MarkersContext } from '@/context/MarkersContext';

const ControlsForm = () => {
    const { newMarkerName, setNewMarkerName, newMarkerDescription, setNewMarkerDescription, handleAddMarker } =
        useContext(MarkersContext);

    return (
        <form noValidate onSubmit={handleAddMarker} className="mx-auto max-w-sm">
            <div>
                <label htmlFor="newMarkerName">Иконка маркера</label>
                <div className="mb-1 flex justify-center">
                    <MarkerIcon />
                </div>
                <MarkerColorOptions />
            </div>

            <div className="mb-5">
                <CustomTextInput
                    label="Название маркера"
                    value={newMarkerName}
                    id="newMarkerName"
                    onChange={setNewMarkerName}
                />
            </div>

            <div className="mb-5">
                <div className="max-w-md">
                    <CustomTextArea
                        label="Описание маркера"
                        value={newMarkerDescription}
                        id="newMarkerDescription"
                        onChange={setNewMarkerDescription}
                    />
                </div>
            </div>

            <div>
                <ImageDownload />
            </div>

            <button
                type="submit"
                className="my-2 me-2 w-full rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
                Добавить маркер
            </button>
        </form>
    );
};

export default ControlsForm;

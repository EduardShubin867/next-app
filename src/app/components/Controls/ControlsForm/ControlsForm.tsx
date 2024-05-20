import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import CustomTextInput from '@/app/components/CustomTextInput/CustomTextInput';
import CustomTextArea from '@/app/components/CustomTextArea/CustomTextArea';
import MarkerIcon from '@/app/components/Controls/MarkerIcon/MarkerIcon';
import MarkerColorOptions from '@/app/components/Controls/MarkerColorOptions/MarkerColorOptions';
import ImageDownload from '@/app/components/Controls/ImageDownload/ImageDownload';
import ButtonLoader from '@/app/components/ButtonLoader/ButtonLoader';

import { MarkersContext } from '@/context/MarkersContext';
import { ImageFile } from '@/types/TMarker';

interface EditImages {
    old: string[];
    new: ImageFile[];
}

interface FormValidationState {
    inputValid: boolean;
    textAreaValid: boolean;
    hasImages: boolean;
}

const ControlsForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [formValidation, setFormValidation] = useState<FormValidationState>({
        inputValid: false,
        textAreaValid: false,
        hasImages: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const {
        newMarkerName,
        setNewMarkerName,
        newMarkerDescription,
        setNewMarkerDescription,
        handleAddMarker,
        handleRemoveImage,
        newMarkerImage,
        setNewMarkerImage,
    } = useContext(MarkersContext);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const eventCaller = event.target.nodeName;
            const value = event.target.value;

            let newValidationState = { ...formValidation };

            if (eventCaller === 'INPUT') {
                setFormValidation((prev) => ({ ...prev, inputValid: value.trim() !== '' }));
            } else if (eventCaller === 'TEXTAREA') {
                setFormValidation((prev) => ({ ...prev, textAreaValid: value.trim() !== '' }));
            }

            setter(value);

            setIsFormValid(
                newValidationState.inputValid && newValidationState.textAreaValid && newValidationState.hasImages
            );
        };

    useEffect(() => {
        const hasImages = newMarkerImage.new.length > 0;

        let newValidationState = { ...formValidation, hasImages };
        setFormValidation(newValidationState);
        setIsFormValid(
            newValidationState.inputValid && newValidationState.textAreaValid && newValidationState.hasImages
        );
    }, [newMarkerImage]);

    const handleSumbit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true);
        await handleAddMarker(event);
        setIsLoading(false);
    };

    return (
        <form noValidate onSubmit={(event) => handleSumbit(event)} className="mx-auto max-w-sm">
            <div>
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
                    onChange={handleInputChange(setNewMarkerName)}
                />
            </div>

            <div className="mb-4">
                <div className="max-w-md">
                    <CustomTextArea
                        label="Описание маркера"
                        value={newMarkerDescription}
                        id="newMarkerDescription"
                        onChange={handleInputChange(setNewMarkerDescription)}
                    />
                </div>
            </div>

            <div className="mb-2">
                <ImageDownload
                    images={newMarkerImage}
                    handleRemoveImage={handleRemoveImage}
                    setImages={setNewMarkerImage}
                />
            </div>

            <button
                type="submit"
                className={clsx(
                    `my-2 me-2 w-full rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800`,
                    isLoading && `pointer-events-none`,
                    isFormValid || `pointer-events-none opacity-50`
                )}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ButtonLoader className="size-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
                ) : (
                    'Добавить маркер'
                )}
            </button>
        </form>
    );
};

export default ControlsForm;

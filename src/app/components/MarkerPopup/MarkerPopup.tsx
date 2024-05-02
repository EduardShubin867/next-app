'use client';

import { useEffect, useState, useContext } from 'react';
import { TMarker } from '@/types/TMarker';
import clsx from 'clsx';

import { MdEdit } from 'react-icons/md';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { MdOutlineSave } from 'react-icons/md';
import { MdOutlineCancelPresentation } from 'react-icons/md';

import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CustomButton from '@/app/components/CustomButton/CustomButton';
import { MarkersContext } from '@/context/MarkersContext';
import ImageDownload from '@/app/components/Controls/ImageDownload/ImageDownload';

import { ImageFile } from '@/types/TMarker';

interface Props {
    marker: TMarker;
    mapEdit: boolean;
    location?: string;
}

interface EditImages {
    old: string[];
    new: ImageFile[];
}

const MarkerPopup = ({ marker, mapEdit }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(marker.name);
    const [editDescription, setEditDescription] = useState(marker.description);
    const [editImage, setEditImage] = useState<EditImages>({ old: marker.images, new: [] });

    const { handleMarkerUpdate, handleRemoveMarker } = useContext(MarkersContext);

    console.log('Popup rerender');
    console.log(editName);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        handleMarkerUpdate({ ...marker, name: editName, description: editDescription });
        setIsEditing(!isEditing);
    };

    const handleRemoveImage = (image: ImageFile | string) => {
        setEditImage((prevImages) => {
            if (image instanceof File) {
                const newImages = prevImages.new.filter((prevImage) => prevImage.id !== image.id);
                return { old: prevImages.old, new: newImages };
            }
            const oldImages = prevImages.old.filter((prevImage) => prevImage !== image);
            return { old: oldImages, new: prevImages.new };
        });
    };

    return (
        <div className="flex min-h-min flex-col items-center p-1">
            <h3
                className={clsx(
                    `mt-1 w-10/12 text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500`,
                    isEditing &&
                        'cursor-text rounded border border-gray-300 ring-offset-1 contentEditable:focus:border-none contentEditable:focus:outline-none'
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onInput={(e) => {
                    e.preventDefault;
                    setEditName(e.currentTarget.textContent as string);
                }}
            >
                {marker.name}
            </h3>

            <hr className="my-2 h-px w-5/6 border-0 bg-gray-200 dark:bg-gray-700" />

            {isEditing ? (
                <ImageDownload images={editImage} setImages={setEditImage} handleRemoveImage={handleRemoveImage} />
            ) : (
                <ImageCarousel images={marker.images} />
            )}

            <div
                className={clsx(
                    `my-2 block min-h-min w-full p-1 text-base font-medium antialiased focus:ring-2 focus:ring-blue-500`,
                    isEditing &&
                        'cursor-text rounded border border-gray-300 contentEditable:focus:border-none contentEditable:focus:outline-none'
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onInput={(e) => {
                    e.preventDefault;
                    setEditDescription(e.currentTarget.textContent as string);
                }}
            >
                {marker.description}
            </div>
            {mapEdit && (
                <div className="flex w-full justify-between">
                    {isEditing ? (
                        <CustomButton color="green" onClick={handleSaveClick}>
                            <MdOutlineSave />
                        </CustomButton>
                    ) : (
                        <CustomButton color="blue" onClick={handleEditClick}>
                            <MdEdit />
                        </CustomButton>
                    )}
                    {isEditing && (
                        <CustomButton color="cyan" onClick={handleCancelClick}>
                            <MdOutlineCancelPresentation />
                        </CustomButton>
                    )}
                    <CustomButton color="red" onClick={() => handleRemoveMarker(marker.id)}>
                        <MdOutlineDeleteForever />
                    </CustomButton>
                </div>
            )}
        </div>
    );
};

export default MarkerPopup;

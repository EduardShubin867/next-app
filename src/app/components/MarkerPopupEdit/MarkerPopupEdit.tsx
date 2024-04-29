'use client';

import { useEffect, useState } from 'react';
import { TMarker } from '@/types/TMarker';
import clsx from 'clsx';

import { MdEdit } from 'react-icons/md';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { MdOutlineSave } from 'react-icons/md';
import { MdOutlineCancelPresentation } from 'react-icons/md';

import ImageCarousel from '../ImageCarousel/ImageCarousel';
import CustomButton from '@/app/components/CustomButton/CustomButton';

interface Props {
    marker: TMarker;
    location: string;
}

type image = {
    data_url: string;
    name: string;
    file?: File;
};

const MarkerPopupEdit = ({ marker, location }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImage, setEditImage] = useState<image[] | null>(null);
    console.log('marker rendered');
    useEffect(() => {
        console.log('use effect');
        setEditDescription(marker.description);
        setEditName(marker.name);
    }, []);

    console.log(marker.description);

    const handleEditClick = () => {
        // setEditDescription(marker.description);
        // setEditName(marker.name);
        // setEditImage(marker.images.map((img) => ({ data_url: img, name: img.slice(15) })));
        setIsEditing(!isEditing);
    };

    const handleCancelClick = () => {
        setEditDescription('');
        setEditName('');
        setEditImage(null);
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        //     dispatch(
        //         updateMarker({
        //             id: marker.id,
        //             name: editName,
        //             description: editDescription,
        //             img: editImage?.map((img) => `/assets/images/${img.name}`),
        //             images: editImage?.filter((imageFile) => imageFile.file),
        //             location,
        //         })
        //     ).unwrap()
        //     handleCancelClick()
        // }
        // const handleDeleteClick = () => {
        //     dispatch(deleteMarker({ id: marker.id, location })).unwrap()
    };

    return (
        <div className="flex min-h-min flex-col items-center p-1">
            <h3
                className={clsx(
                    `mt-1 w-10/12 text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500`,
                    isEditing &&
                        'contentEditable:focus:border-none contentEditable:focus:outline-none cursor-text rounded border border-gray-300'
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
            >
                {marker.name}
            </h3>

            <hr className="my-2 h-px w-5/6 border-0 bg-gray-200 dark:bg-gray-700" />

            <ImageCarousel images={marker.images} />

            <hr className="my-2 h-px w-5/6 border-0 bg-gray-200 dark:bg-gray-700" />

            <div
                className={clsx(
                    `mb-2 block min-h-min w-full p-1 text-base font-medium antialiased focus:ring-2 focus:ring-blue-500`,
                    isEditing &&
                        'contentEditable:focus:border-none contentEditable:focus:outline-none cursor-text rounded border border-gray-300'
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onInput={(e) => {
                    e.preventDefault;
                    console.log(e.currentTarget.textContent);
                }}
            >
                {marker.description}
            </div>

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
                <CustomButton color="red" onClick={() => console.log('deleted')}>
                    <MdOutlineDeleteForever />
                </CustomButton>
            </div>
        </div>
    );
};

export default MarkerPopupEdit;

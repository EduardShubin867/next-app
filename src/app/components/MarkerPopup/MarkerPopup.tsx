'use client';

import clsx from 'clsx';
import { useCallback, useContext, useState } from 'react';
import {
  MdEdit,
  MdOutlineCancelPresentation,
  MdOutlineDeleteForever,
  MdOutlineSave,
} from 'react-icons/md';

import ImageDownload from '@/app/components/Controls/ImageDownload/ImageDownload';
import CustomButton from '@/app/components/CustomButton/CustomButton';
import { MarkersContext } from '@/context/MarkersContext';
import { ImageFile, TMarker } from '@/types/TMarker';

import ButtonLoader from '../ButtonLoader/ButtonLoader';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

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
  const [editImage, setEditImage] = useState<EditImages>({
    old: marker.images,
    new: [],
  });

  const {
    handleMarkerUpdate,
    handleRemoveMarker,
    loadingUpdateMarker,
    loadingDeleteMarker,
  } = useContext(MarkersContext);

  const handleEditClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleCancelClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async (event: React.SyntheticEvent) => {
    event.stopPropagation();
    await handleMarkerUpdate(
      {
        ...marker,
        name: editName,
        description: editDescription,
        images: editImage.old,
      },
      editImage.new
    );
    setIsEditing(!isEditing);
  };

  const handleRemoveImage = useCallback(
    (image: ImageFile | string, event: React.SyntheticEvent) => {
      event.stopPropagation();
      setEditImage((prevImages) => {
        const { old, new: newImages } = prevImages;

        if (image instanceof File) {
          const filteredNewImages = newImages.filter(
            (img) => img.id !== image.id
          );
          return { old, new: filteredNewImages };
        }

        const filteredOldImages = old.filter((img) => img !== image);
        return { old: filteredOldImages, new: newImages };
      });
    },
    []
  );

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
          e.preventDefault();
          setEditName(e.currentTarget.textContent as string);
        }}
      >
        {marker.name}
      </h3>

      <hr className="my-2 h-px w-5/6 border-0 bg-gray-200 dark:bg-gray-700" />

      {isEditing ? (
        <ImageDownload
          images={editImage}
          setImages={setEditImage}
          handleRemoveImage={handleRemoveImage}
        />
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
          e.preventDefault();
          setEditDescription(e.currentTarget.textContent as string);
        }}
      >
        {marker.description}
      </div>
      {mapEdit && (
        <div className="flex w-full justify-between">
          {isEditing ? (
            <CustomButton color="green" onClick={handleSaveClick}>
              {loadingUpdateMarker ? (
                <ButtonLoader className="size-5 animate-spin fill-cyan-700 text-cyan-700" />
              ) : (
                <MdOutlineSave />
              )}
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
          <CustomButton color="red" onClick={() => handleRemoveMarker(marker)}>
            {loadingDeleteMarker ? (
              <ButtonLoader className="size-5 animate-spin fill-red-700 text-red-700" />
            ) : (
              <MdOutlineDeleteForever />
            )}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default MarkerPopup;

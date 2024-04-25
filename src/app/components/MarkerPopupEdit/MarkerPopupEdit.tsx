'use client';

import { SetStateAction, useState } from 'react';
import uuid from 'react-uuid';
import Image from 'next/image';
import { TMarker } from '@/types/TMarker';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

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
  console.log(marker.img.length > 1);

  const handleEditClick = () => {
    setEditDescription(marker.description);
    setEditName(marker.name);
    setEditImage(marker.img.map((img) => ({ data_url: img, name: img.slice(15) })));
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
    <div className="flex justify-between">
      <div className="block justify-center p-0">
        {isEditing ? (
          <input
            type="text"
            placeholder="Название"
            className="input input-bordered mb-1 w-full"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          <h3 className="m-2 text-center text-xl">{marker.name}</h3>
        )}

        <hr className="my-2" />

        {marker.img.length > 1 ? (
          <ImageCarousel images={marker.img} />
        ) : (
          marker.img.map((img, index) => (
            <Image key={uuid()} src={img} className="img-fluid" width={280} height={280} alt={`Slide ${index}`} />
          ))
        )}

        {isEditing ? (
          <textarea
            className="textarea textarea-bordered mt-1 w-full"
            rows={3}
            defaultValue={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        ) : (
          <div className="p-2">{marker.description}</div>
        )}

        <div className="flex justify-between">
          {isEditing ? (
            <button className="btn btn-success m-1" title="Сохранить" onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            <button className="btn btn-warning m-1" title="Редактировать" onClick={handleEditClick}>
              Edit
            </button>
          )}
          {isEditing && (
            <button className="btn btn-error m-1" title="Отмена" onClick={handleCancelClick}>
              Cancel
            </button>
          )}
          <button className="btn btn-error m-1" title="Удалить" onClick={() => console.log('deleted')}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopupEdit;

'use client';

import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineUpload } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

import ImagesThumbs from '@/app/components/ImagesThumbs/ImagesThumbs';
import { ImageFile } from '@/types/TMarker';

interface EditImages {
  old: string[];
  new: ImageFile[];
}
interface Props {
  images: EditImages;
  setImages: React.Dispatch<React.SetStateAction<EditImages>>;
  handleRemoveImage: (
    image: string | ImageFile,
    event: React.SyntheticEvent
  ) => void;
}

const ImageDownload = ({ images, setImages, handleRemoveImage }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setImages((prevState) => {
        const newFiles: ImageFile[] = acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
            id: uuid(),
          })
        );
        return {
          old: [...prevState.old],
          new: [...prevState.new, ...newFiles],
        } as EditImages;
      });
    },
  });

  const uploadColSpan = useMemo(() => {
    const imagesPerRow = 3;
    const currentRowImageCount = images.new.length % imagesPerRow;
    const remainingSpaceOnRow =
      currentRowImageCount === 0
        ? imagesPerRow
        : imagesPerRow - currentRowImageCount;
    return Math.min(remainingSpaceOnRow, 3);
  }, [images.new.length]);

  return (
    <div
      className={clsx(
        'grid h-auto w-full grid-cols-3 place-items-center gap-1',
        images.new.length > 3 ? 'grid-rows-2' : 'grid-rows-1'
      )}
    >
      <ImagesThumbs images={images} handleRemoveImage={handleRemoveImage} />
      <div
        {...getRootProps()}
        className={clsx(
          `col-span-${uploadColSpan} w-full`,
          images.new.length >= 6 ? 'hidden' : 'block'
        )}
      >
        <input {...getInputProps()} />
        <div
          className={clsx(
            'flex size-[5.6rem] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-2',
            isDragActive
              ? 'border-gray-400 bg-gray-300'
              : 'border-gray-300 bg-gray-200'
          )}
        >
          <div className="flex h-full items-center justify-center text-xl text-gray-500">
            <AiOutlineUpload size={42} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDownload;

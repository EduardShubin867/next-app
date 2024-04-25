'use client';
import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { ImageFile } from '@/types/TMarker';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  setNewMarkerImage: Dispatch<SetStateAction<Array<ImageFile>>>;
  newMarkerImage: Array<ImageFile>;
}

const ImageDownload = React.memo(({ setNewMarkerImage, newMarkerImage }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setNewMarkerImage((prevState) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        );
        return [...prevState, ...newFiles];
      });
    },
  });

  useEffect(() => {
    setNewMarkerImage((prevState) => {
      return prevState.map((file) => {
        URL.revokeObjectURL(file.url);
        return file;
      });
    });
  }, []);

  const thumbs = newMarkerImage.map((file) => {
    return (
      <div className="flex flex-row flex-wrap" key={file.name}>
        <Image src={file.url} width={100} height={100} alt={file.name} />
      </div>
    );
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={clsx(
            'h-[250px] w-full cursor-pointer rounded-lg border-2 border-dashed p-2 text-center',
            isDragActive ? 'bg-gray-300' : 'bg-gray-200',
            isDragActive ? 'border-gray-400' : 'border-gray-300'
          )}
        >
          {newMarkerImage.length > 0 ? (
            thumbs
          ) : (
            <div className="h-full justify-center">
              <p>Drop files here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ImageDownload.displayName = 'ImageDownload';
ImageDownload.whyDidYouRender = true;

export default ImageDownload;

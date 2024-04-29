'use client';

import React, { useEffect, useContext, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import clsx from 'clsx';
import { AiOutlineUpload } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import { ImageFile } from '@/types/TMarker';

import { MarkersContext } from '@/context/MarkersContext';

const ImageDownload = () => {
    const { setNewMarkerImage, newMarkerImage, handleRemoveImage } = useContext(MarkersContext);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setNewMarkerImage((prevState) => {
                const newFiles: ImageFile[] = acceptedFiles.map((file) =>
                    Object.assign(file, {
                        url: URL.createObjectURL(file),
                        id: uuid(),
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
            <div key={file.name} className="group relative col-span-1 flex p-1">
                <div className="flex flex-row flex-wrap">
                    <Image className="rounded" src={file.url} width={100} height={100} alt={file.name} />
                </div>
                <div
                    className="absolute right-0 top-0 flex size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
                    onClick={() => handleRemoveImage(file.id)}
                >
                    &times;
                </div>
            </div>
        );
    });

    const uploadColSpan = useMemo(() => {
        const imagesPerRow = 3;
        const currentRowImageCount = newMarkerImage.length % imagesPerRow;
        const remainingSpaceOnRow = currentRowImageCount === 0 ? imagesPerRow : imagesPerRow - currentRowImageCount;
        return Math.min(remainingSpaceOnRow, 3);
    }, [newMarkerImage.length]);

    console.log(uploadColSpan);

    return (
        <div
            className={clsx(
                'grid h-auto w-full grid-cols-3 place-items-center gap-1',
                newMarkerImage.length > 3 ? 'grid-rows-2' : 'grid-rows-1'
            )}
        >
            {thumbs}
            <div
                {...getRootProps()}
                className={clsx(`col-span-${uploadColSpan} w-full`, newMarkerImage.length >= 6 ? 'hidden' : 'block')}
            >
                <input {...getInputProps()} />
                <div
                    className={clsx(
                        'flex h-auto min-h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-2',
                        isDragActive ? 'border-gray-400 bg-gray-300' : 'border-gray-300 bg-gray-200'
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

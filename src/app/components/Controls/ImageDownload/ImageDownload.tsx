import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import clsx from 'clsx';

const ImageDownload = () => {
  const [files, setFiles] = useState<Array<any>>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  const thumbs = files.map((file) => {
    return (
      <div key={file.name}>
        <Image
          src={file.preview}
          width={50}
          height={50}
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    );
  });

  console.log(files);

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={clsx(
            'h-[250px] w-full cursor-pointer rounded-lg border-2 border-dashed text-center',
            isDragActive ? 'bg-gray-300' : 'bg-gray-200',
            isDragActive ? 'border-gray-400' : 'border-gray-300'
          )}
        >
          {files.length > 0 ? (
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
};

export default ImageDownload;

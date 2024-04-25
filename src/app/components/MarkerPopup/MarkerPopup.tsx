'use client';

import Image from 'next/image';
import ImageCarousel from '@/app/components/ImageCarousel/ImageCarousel';
import { TMarker } from '@/types/TMarker';

const MarkerPopup = ({ marker }: { marker: TMarker }) => {
  return (
    <div className="block justify-center p-0 ">
      <h3 className="m-2 text-center text-xl font-semibold">{marker.name}</h3>

      {marker.img.length > 1 ? (
        <ImageCarousel images={marker.img} />
      ) : (
        <Image src={marker.img[0]} className="img-fluid h-auto w-full" alt="Single" />
      )}

      <div className="mb-2 mt-2 pl-1 pr-1">{marker.description}</div>
    </div>
  );
};

export default MarkerPopup;

'use client';

import Image from 'next/image';
import ImageCarousel from '@/app/components/ImageCarousel/ImageCarousel';
import { TMarker } from '@/types/TMarker';

const MarkerPopup = ({ marker }: { marker: TMarker }) => {
    return (
        <div className="block justify-center p-0 ">
            <h3 className="m-2 text-center text-xl font-semibold">{marker.name}</h3>

            {marker.images.length > 1 ? (
                <ImageCarousel images={marker.images} />
            ) : (
                <Image
                    src={`/public/assets/images/map/${marker.images[0]}`}
                    className="img-fluid h-auto w-full"
                    alt="Single"
                />
            )}

            <div className="my-2 px-1">{marker.description}</div>
        </div>
    );
};

export default MarkerPopup;

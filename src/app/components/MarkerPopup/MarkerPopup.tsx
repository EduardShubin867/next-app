'use client';

import ImageCarousel from '@/app/components/ImageCarousel/ImageCarousel';
import { TMarker } from '@/types/TMarker';

const MarkerPopup = ({ marker }: { marker: TMarker }) => {
    console.log(marker);
    return (
        <div className="flex min-h-min flex-col justify-center p-0 ">
            <h3 className="m-2 text-center text-xl font-semibold">{marker.name}</h3>
            <hr className="my-2" />
            <ImageCarousel images={marker.images} />
            <hr className="my-2" />
            <div className="mx-1 my-2 min-h-min p-1 text-base font-medium antialiased">{marker.description}</div>
        </div>
    );
};

export default MarkerPopup;

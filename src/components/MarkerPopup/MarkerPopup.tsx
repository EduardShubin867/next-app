import Image from 'next/image'
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel'
import { TMarker } from '@/types/TMarker'

const MarkerPopup = ({ marker }: { marker: TMarker }) => {
    return (
        <div className="block justify-center p-0">
            <h3 className="text-center m-2 text-xl font-semibold">
                {marker.name}
            </h3>

            {marker.img.length > 1 ? (
                <ImageCarousel images={marker.img} />
            ) : (
                <Image
                    src={marker.img[0]}
                    className="img-fluid w-full h-auto"
                    alt="Single"
                />
            )}

            <div className="mt-2 mb-2 pr-1 pl-1">{marker.description}</div>
        </div>
    )
}

export default MarkerPopup

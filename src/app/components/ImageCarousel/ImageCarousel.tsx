'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { ImageFile } from '@/types/TMarker';

type ImageArray = Array<ImageFile>;
interface ImageCarouselProps {
    images: ImageArray | Array<string>;
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
        <Carousel showThumbs={false}>
            {images.map((img) => (
                <div key={uuidv4()}>
                    <Image src={img.url} className="h-auto w-full" width={360} height={360} alt={`Slide ${img.name}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;

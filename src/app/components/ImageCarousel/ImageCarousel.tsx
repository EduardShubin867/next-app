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

function handleImages(image: ImageFile | string) {
    if (typeof image === 'string') {
        return image;
    } else {
        return image.url;
    }
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    const multipleItems = images.length > 1;
    return (
        <Carousel
            showThumbs={false}
            showArrows={multipleItems}
            showIndicators={multipleItems}
            showStatus={multipleItems}
            statusFormatter={(currentItem, total) => `${currentItem} из ${total}`}
            infiniteLoop={true}
        >
            {images.map((img, index) => (
                <div key={uuidv4()}>
                    <Image
                        src={handleImages(img)}
                        className="h-auto w-full rounded"
                        width={360}
                        height={360}
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;

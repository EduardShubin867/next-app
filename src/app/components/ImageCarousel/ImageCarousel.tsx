'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { v4 as uuidv4 } from 'uuid';

import { ImageFile } from '@/types/TMarker';

import Loader from './Loader';

type ImageArray = Array<ImageFile>;
interface ImageCarouselProps {
  images: ImageArray | Array<string>;
  isEditing?: boolean;
}

const handleImages = (image: ImageFile | string) => {
  if (typeof image === 'string') {
    return `${process.cwd()}/${image}`;
  } else {
    return image.url;
  }
};

const ImageCarousel = ({ images, isEditing = false }: ImageCarouselProps) => {
  const multipleItems = images.length > 1 || isEditing;

  return (
    <div>
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
            <Suspense fallback={<Loader />}>
              <Image
                src={handleImages(img)}
                className="h-auto w-full rounded shadow-md"
                width={300}
                height={300}
                alt={`Slide ${index + 1}`}
              />
            </Suspense>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;

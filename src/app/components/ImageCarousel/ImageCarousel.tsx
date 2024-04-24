'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
        <Carousel>
            {images.map((img, index) => (
                <div key={uuidv4()}>
                    <Image
                        src={img}
                        className="w-full h-auto"
                        width={360}
                        height={360}
                        alt={`Slide ${index}`}
                    />
                </div>
            ))}
        </Carousel>
    )
}

export default ImageCarousel

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
    })

    return (
        <div ref={sliderRef} className="keen-slider">
            {images.map((img, index) => (
                <div className="keen-slider__slide" key={uuidv4()}>
                    <Image
                        src={img}
                        className="w-full h-auto"
                        alt={`Slide ${index}`}
                    />
                </div>
            ))}
        </div>
    )
}

export default ImageCarousel

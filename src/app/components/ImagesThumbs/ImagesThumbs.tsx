import { ImageFile } from '@/types/TMarker';
import Image from 'next/image';

interface EditImages {
    old: string[];
    new: ImageFile[];
}
interface Props {
    images: EditImages;
    handleRemoveImage: (arg0: string | ImageFile) => void;
}

const ImagesThumbs = ({ images, handleRemoveImage }: Props) => {
    const handleImageType = (image: ImageFile | string) => {
        if (typeof image === 'string') {
            return image;
        } else {
            return image.url;
        }
    };

    const imagesIterable = [...images.new, ...images.old];

    return imagesIterable.map((image, index) => {
        const key = typeof image === 'string' ? image : image.id || image.url;
        return (
            <div key={key} className="group relative col-span-1 flex p-1">
                <div className="flex flex-row flex-wrap">
                    <Image
                        className="rounded"
                        src={handleImageType(image)}
                        width={100}
                        height={100}
                        alt={`Image ${index + 1}`}
                    />
                </div>
                <div
                    className="absolute right-0 top-0 flex size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
                    onClick={() => handleRemoveImage(image)}
                >
                    &times;
                </div>
            </div>
        );
    });
};

export default ImagesThumbs;

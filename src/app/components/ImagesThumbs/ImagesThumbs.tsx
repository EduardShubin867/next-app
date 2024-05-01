import { ImageFile } from '@/types/TMarker';
import Image from 'next/image';

interface Props {
    images: ImageFile[] | string[];
    handleRemoveImage: (arg0: string) => void;
}

const ImagesThumbs = ({ images, handleRemoveImage }: Props) => {
    return images.map((file) => {
        return (
            <div key={file.name} className="group relative col-span-1 flex p-1">
                <div className="flex flex-row flex-wrap">
                    <Image className="rounded" src={file.url} width={100} height={100} alt={file.name} />
                </div>
                <div
                    className="absolute right-0 top-0 flex size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
                    onClick={() => handleRemoveImage(file.id)}
                >
                    &times;
                </div>
            </div>
        );
    });
};

export default ImagesThumbs;

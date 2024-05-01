import { useMap } from 'react-leaflet';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useMapEvent } from 'react-leaflet/hooks';
import { useState } from 'react';
import clsx from 'clsx';

function ZoomControl() {
    const [currentZoom, setCurrentZoom] = useState<number>(8);

    const map = useMap();

    const { maxZoom, minZoom } = map.options;

    useMapEvent('zoomend', (e) => setCurrentZoom(e.target._zoom));

    const handleZoomIn = () => {
        map.zoomIn();
    };

    const handleZoomOut = () => {
        map.zoomOut();
    };

    return (
        <div className="inline-flex flex-col items-center rounded-md bg-transparent shadow-xl">
            <button
                onClick={handleZoomIn}
                className={clsx(
                    `rounded-t-md p-2 px-2.5 py-3 text-sm font-medium text-gray-500 focus:outline-none`,
                    currentZoom === maxZoom
                        ? `pointer-events-none bg-gray-400 hover:bg-gray-400`
                        : `bg-white hover:bg-gray-200 active:bg-gray-300`
                )}
                disabled={currentZoom === maxZoom}
            >
                <FaPlus />
            </button>
            <button
                onClick={handleZoomOut}
                className={clsx(
                    `rounded-b-md p-2 px-2.5 py-3 text-sm font-medium text-gray-500 focus:outline-none`,
                    currentZoom === minZoom
                        ? `pointer-events-none bg-gray-400 hover:bg-gray-400`
                        : `bg-white hover:bg-gray-200 active:bg-gray-300`
                )}
                disabled={currentZoom === minZoom}
            >
                <FaMinus />
            </button>
        </div>
    );
}

export default ZoomControl;

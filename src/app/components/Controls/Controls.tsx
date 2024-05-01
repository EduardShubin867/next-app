'use client';

import { useEffect, useRef, SetStateAction, Dispatch } from 'react';
import L from 'leaflet';

import NewMarker from '@/app/components/Controls/NewMarker/NewMarker';
import Switch from '@/app/components/Switch/Switch';
import ControlsForm from '@/app/components/Controls/ControlsForm/ControlsForm';
import ZoomControl from '@/app/components/Controls/ZoomControl/ZoomControl';

type Props = {
    mapEdit: boolean;
    handleSwitchChange: () => void;
    location: string;
};

const Controls = ({ mapEdit, handleSwitchChange, location }: Props) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current);
            L.DomEvent.disableScrollPropagation(containerRef.current);
        }
    }, []);

    return (
        <div ref={containerRef}>
            {mapEdit ? <NewMarker /> : null}
            <div className="leaflet-top leaflet-right">
                <div className="leaflet-control leaflet-bar !border-none">
                    <div className="absolute right-2 top-16">
                        <Switch checked={mapEdit} onChange={handleSwitchChange} />
                    </div>
                    {mapEdit ? (
                        <div className="relative top-24">
                            <div className="popover popover-bottom">
                                <div className="popover-body mt-2 max-h-[800px] w-[350px] p-0">
                                    <div className="w-full max-w-sm overflow-auto rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-3 md:p-4">
                                        <ControlsForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="leaflet-top leaflet-left">
                <div className="leaflet-control leaflet-bar !border-none">
                    <div className="absolute left-2 top-16">
                        <ZoomControl />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;

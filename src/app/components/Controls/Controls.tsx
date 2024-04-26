'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

import NewMarker from '@/app/components/Controls/NewMarker/NewMarker';
import Switch from '@/app/components/Switch/Switch';
import ControlsForm from '@/app/components/Controls/ControlsForm/ControlsForm';

type Props = {
    mapEdit: boolean;
    handleSwitchChange: () => void;
    location: string;
};

const Controls = ({ mapEdit, handleSwitchChange, location }: Props) => {
    const containerRef = useRef(null);
    console.log('Rerender');

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current);
            L.DomEvent.disableScrollPropagation(containerRef.current);
        }
    }, []);

    return (
        <div>
            {mapEdit ? <NewMarker /> : null}
            <div className="leaflet-top leaflet-right" ref={containerRef}>
                <div className="leaflet-control leaflet-bar control-switch">
                    <div className="absolute right-2 top-4">
                        <Switch checked={mapEdit} onChange={handleSwitchChange} />
                    </div>
                    {mapEdit ? (
                        <div className="relative top-10">
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
        </div>
    );
};

export default Controls;

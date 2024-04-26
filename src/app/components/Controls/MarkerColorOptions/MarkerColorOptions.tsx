import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { useDebounce } from '@/hooks/useDebounce';

import { NewMarkerContext } from '@/context/NewMarkerContext';

const MarkerColorOptions = () => {
    const { setNewMarkerColor } = useContext(NewMarkerContext);
    const [color, setColor] = useState<string>('#000000');
    const debouncedColor = useDebounce<string>(color, 500);

    useEffect(() => {
        setNewMarkerColor(debouncedColor);
    }, [debouncedColor, setNewMarkerColor]);

    return (
        <div className="flex flex-wrap justify-center">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
    );
};

export default MarkerColorOptions;

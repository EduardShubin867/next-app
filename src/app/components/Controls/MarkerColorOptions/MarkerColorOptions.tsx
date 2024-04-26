import React, { useContext } from 'react';
import uuid from 'react-uuid';

import { NewMarkerContext } from '@/context/NewMarkerContext';

const MarkerColorOptions = () => {
    const colorOptions = ['black', 'blue', 'yellow', 'skyblue'];
    const { newMarkerColor, setNewMarkerColor } = useContext(NewMarkerContext);

    const handleSelectedStyle = (newColor: string) => {
        return newColor === newMarkerColor ? 'ring-2 ring-offset-2 ring-blue-500' : '';
    };

    return (
        <div className="flex flex-wrap justify-center">
            {colorOptions.map((optionColor) => {
                const bgColor = `bg-${optionColor}-500`;
                return (
                    <div
                        key={uuid()}
                        className={`m-2 size-12 rounded-full ${bgColor} cursor-pointer ${handleSelectedStyle(optionColor)}`}
                        style={{ backgroundColor: optionColor }}
                        onClick={() => setNewMarkerColor(optionColor)}
                    />
                );
            })}
        </div>
    );
};

export default MarkerColorOptions;

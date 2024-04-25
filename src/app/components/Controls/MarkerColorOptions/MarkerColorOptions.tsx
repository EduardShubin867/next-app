import React, { Dispatch, SetStateAction } from 'react';
import uuid from 'react-uuid';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

const MarkerColorOptions = ({ color, setColor }: Props) => {
  const colorOptions = ['black', 'white', 'blue', 'yellow', 'skyblue'];

  const handleSelectedStyle = (newColor: string) => {
    return newColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : '';
  };

  return (
    <div className="flex flex-wrap justify-center">
      {colorOptions.map((optionColor) => {
        return (
          <div
            key={uuid()}
            className={`m-2 h-12 w-12 rounded-full bg-${optionColor}-500 cursor-pointer ${handleSelectedStyle(
              optionColor
            )}`}
            style={{ backgroundColor: optionColor }}
            onClick={() => setColor(optionColor)}
          />
        );
      })}
    </div>
  );
};

export default MarkerColorOptions;

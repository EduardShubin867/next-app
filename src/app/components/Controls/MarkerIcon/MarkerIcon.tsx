import { Dispatch, SetStateAction } from 'react';
import uuid from 'react-uuid';
import Image from 'next/image';

interface Props {
  setNewMarkerIcon: Dispatch<SetStateAction<string>>;
  newMarkerIcon: string;
  color: string;
}

const MarkerIcon = ({ setNewMarkerIcon, newMarkerIcon, color }: Props) => {
  const iconOptions = ['location_on_black_24dp', 'map-pin', 'house', 'location_city_black_24dp'];

  const handleSelectedStyle = (icon: string) => {
    if (newMarkerIcon === icon) {
      return 'marker-icon-selected';
    }
    return '';
  };

  return iconOptions.map((icon) => {
    return (
      <Image
        key={uuid()}
        src={`/assets/images/icons/${icon}.svg`}
        alt={`${icon}`}
        width={24}
        height={24}
        className={`img-fluid marker-icon-options marker-color--${color} ${handleSelectedStyle(icon)}`}
        onClick={() => setNewMarkerIcon(icon)}
      />
    );
  });
};

export default MarkerIcon;

import { useContext } from 'react';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHouseChimney, faLocationDot, faMapPin, faTree } from '@fortawesome/free-solid-svg-icons';

import { MarkersContext } from '@/context/MarkersContext';

const MarkerIcon = () => {
    const iconOptions = [
        { icon: faLocationDot, name: 'fa-solid fa-location-dot' },
        {
            icon: faMapPin,
            name: 'fa-solid fa-map-pin',
        },
        {
            icon: faHouseChimney,
            name: 'fa-solid fa-house-chimney',
        },
        {
            icon: faBuilding,
            name: 'fa-solid fa-building',
        },
        {
            icon: faTree,
            name: 'fa-solid fa-tree',
        },
    ];

    const { newMarkerIcon, setNewMarkerIcon, newMarkerColor } = useContext(MarkersContext);

    const handleSelectedStyle = (icon: string) => {
        if (newMarkerIcon === icon) {
            return 'marker-icon-selected';
        }
        return '';
    };

    return iconOptions.map((item) => {
        return (
            <div key={uuid()} className={` m-1 p-1`}>
                <FontAwesomeIcon
                    icon={item.icon}
                    color={newMarkerColor}
                    className={`cursor-pointer ${handleSelectedStyle(item.name)} hover:marker-icon-hover`}
                    size="4x"
                    onClick={() => setNewMarkerIcon(item.name)}
                />
            </div>
        );
    });
};

export default MarkerIcon;

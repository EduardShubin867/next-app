import { Dispatch, SetStateAction, useContext } from 'react'
import uuid from 'react-uuid'
import Image from 'next/image'

import { NewMarkerContext } from '@/context/NewMarkerContext'

const MarkerIcon = () => {
    const iconOptions = [
        'location_on_black_24dp',
        'map-pin',
        'house',
        'location_city_black_24dp',
    ]

    const { newMarkerIcon, setNewMarkerIcon, newMarkerColor } =
        useContext(NewMarkerContext)

    const handleSelectedStyle = (icon: string) => {
        if (newMarkerIcon === icon) {
            return 'marker-icon-selected'
        }
        return ''
    }

    return iconOptions.map((icon) => {
        return (
            <Image
                key={uuid()}
                src={`/assets/images/icons/${icon}.svg`}
                alt={`${icon}`}
                width={24}
                height={24}
                className={`img-fluid marker-icon-options marker-color--${newMarkerColor} ${handleSelectedStyle(icon)}`}
                onClick={() => setNewMarkerIcon(icon)}
            />
        )
    })
}

export default MarkerIcon

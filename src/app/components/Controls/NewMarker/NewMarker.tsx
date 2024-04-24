'use client'

import React, { useRef, Dispatch, SetStateAction } from 'react'
import { LatLngExpression } from 'leaflet'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import Image from 'next/image'
import ImageCarousel from '../../ImageCarousel/ImageCarousel'

type TImage = {
    name: string
}

interface Props {
    newPosition: LatLngExpression
    setNewPosition: Dispatch<SetStateAction<LatLngExpression>>
    newMarkerIcon: string
    newMarkerName: string
    newMarkerDescription: string
    newMarkerImg: string[]
    color: string
}

const NewMarker = ({
    newPosition,
    setNewPosition,
    newMarkerIcon,
    newMarkerName,
    newMarkerDescription,
    newMarkerImg,
    color,
}: Props) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng
            setNewPosition([lat, lng])
        },
    })

    const markerIcon = L.icon({
        iconUrl: `/assets/images/icons/${newMarkerIcon}.svg`,
        iconSize: [32, 32],
        className: `marker-color--${color}`,
    })

    return newPosition ? (
        <Marker position={newPosition} icon={markerIcon}>
            <Popup className="marker-popup">
                <div className="block justify-center p-0 new-marker-popup">
                    <h3
                        className={`text-center m-2 ${
                            newMarkerName ? '' : 'text-gray-500'
                        }`}
                    >
                        {newMarkerName || 'Название'}
                    </h3>

                    <hr className="my-2" />

                    {newMarkerImg && newMarkerImg.length > 0 ? (
                        <ImageCarousel images={newMarkerImg} />
                    ) : (
                        <div className="bg-gray-300 h-24" /> // Placeholder box if no image
                    )}

                    <div className="mt-2 mb-2 pr-1 pl-1 text-sm">
                        {newMarkerDescription ||
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
                    </div>
                </div>
            </Popup>
        </Marker>
    ) : null
}

export default NewMarker

'use client'
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import { LatLngBoundsExpression } from 'leaflet'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { StaticImageData } from 'next/image'

import MarkersRender from '@/components/MarkersRender/MarkersRender'
import Controls from '@/components/Controls/Controls'

import 'leaflet/dist/leaflet.css'
import './mapStyles.css'
// import './scss/Map.scss'

type MapProps = {
    customImage: StaticImageData
}

const Map = ({ customImage }: MapProps) => {
    const isAdmin = true

    const [mapEdit, setMapEdit] = useState(true)
    const location = usePathname().slice(1)

    const bounds: LatLngBoundsExpression = [
        [0, 0],
        [9, 16],
    ]

    // const center = [2.5, 7.2]

    const handleSwitchChange = () => {
        setMapEdit(!mapEdit) // Инвертируем текущее состояние
    }

    return (
        <div id="map">
            <MapContainer>
                <ImageOverlay url={customImage} bounds={bounds} />
                <MarkersRender mapEdit={mapEdit} location={location} />

                {isAdmin ? (
                    <Controls
                        mapEdit={mapEdit}
                        handleSwitchChange={handleSwitchChange}
                        location={location}
                    />
                ) : null}
                <PanRestrict bounds={bounds} />
            </MapContainer>
        </div>
    )
}

// Ограничение перемещения за пределы карты
function PanRestrict({ bounds }: { bounds: LatLngBoundsExpression }) {
    const map = useMap()
    map.setMaxBounds(bounds)
    map.on('drag', () => {
        if (
            map.getBounds().getNorth() < bounds[0][0] ||
            map.getBounds().getEast() < bounds[0][1] ||
            map.getBounds().getSouth() > bounds[1][0] ||
            map.getBounds().getWest() > bounds[1][1]
        ) {
            map.panInsideBounds(bounds)
        }
    })

    return null
}

export default Map

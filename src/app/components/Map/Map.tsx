'use client'

import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import { LatLngBoundsExpression, LatLngExpression, LatLngBounds } from 'leaflet'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { StaticImageData } from 'next/image'

import MarkersRender from '@/app/components/MarkersRender/MarkersRender'
import Controls from '@/app/components/Controls/Controls'

import 'leaflet/dist/leaflet.css'
import './mapStyles.css'
import { getMarkers } from '@/app/lib/actions'

type MapProps = {
    customImage: StaticImageData
}

interface PanRestrictProps {
    bounds: LatLngBoundsExpression
}

const Map = ({ customImage }: MapProps) => {
    const isAdmin = true

    const [mapEdit, setMapEdit] = useState(true)
    const location = usePathname().slice(1)
    const bounds: LatLngBoundsExpression = [
        [0, 0],
        [9, 16],
    ]

    const center: LatLngExpression = [2.5, 7.2]

    const handleSwitchChange = () => {
        setMapEdit(!mapEdit)
    }

    return (
        <div id="map" className="h-[93.4vh]">
            <MapContainer
                center={center}
                zoom={8}
                maxZoom={12}
                minZoom={8}
                scrollWheelZoom={true}
            >
                <ImageOverlay url={customImage.src} bounds={bounds} />
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
const PanRestrict = ({ bounds }: PanRestrictProps) => {
    const map = useMap()

    useEffect(() => {
        map.setMaxBounds(bounds)

        const handleDrag = () => {
            let north, east, south, west

            if (Array.isArray(bounds) && bounds.length === 2) {
                north = bounds[0][0]
                east = bounds[0][1]
                south = bounds[1][0]
                west = bounds[1][1]
            } else if (bounds instanceof LatLngBounds) {
                north = bounds.getNorth()
                east = bounds.getEast()
                south = bounds.getSouth()
                west = bounds.getWest()
            } else {
                console.error('Unsupported bounds type for PanRestrict')
                return
            }

            if (
                map.getBounds().getNorth() < north ||
                map.getBounds().getEast() < east ||
                map.getBounds().getSouth() > south ||
                map.getBounds().getWest() > west
            ) {
                map.panInsideBounds(bounds)
            }
        }

        map.on('drag', handleDrag)

        // Cleanup function
        return () => {
            map.off('drag', handleDrag)
        }
    }, [map, bounds]) // Only re-run the effect if map or bounds change

    return null
}
export default Map

import customMap from '@/assets/maps/FOKAS2k.png'
import Map from '@/components/Map/Map'

export default function KrasnoeBedstvieMap() {
    return (
        <div>
            <Map customImage={customMap} />
        </div>
    )
}

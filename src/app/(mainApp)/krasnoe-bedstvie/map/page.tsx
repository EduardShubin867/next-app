import customMap from '@/assets/maps/FOKAS2k.png'
import { Suspense } from 'react'
import Loader from '@/app/(mainApp)/krasnoe-bedstvie/loader'
// import Map from '@/app/components/Map/Map'

import dynamic from 'next/dynamic'

export default function KrasnoeBedstvieMap() {
    const Map = dynamic(() => import('@/app/components/Map/Map'), {
        loading: () => <Loader />,
        ssr: false,
    })

    return (
        <Suspense fallback="Loading...">
            <Map customImage={customMap} />
        </Suspense>
    )
}

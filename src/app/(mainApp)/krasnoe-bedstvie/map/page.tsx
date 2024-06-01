'use client';
import customMap from '@/assets/maps/fokas.webp';
import Loader from '@/app/(mainApp)/krasnoe-bedstvie/loader';

import dynamic from 'next/dynamic';

export default function KrasnoeBedstvieMap() {
    const Map = dynamic(() => import('@/app/components/Map/Map'), {
        loading: () => <Loader />,
        ssr: false,
    });

    return <Map customImage={customMap} />;
}

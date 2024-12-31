'use client';
import dynamic from 'next/dynamic';

import customMap from '@/assets/maps/fokas.webp';

import Loader from '../loader';

export default function KrasnoeBedstvieMap() {
  const Map = dynamic(() => import('@/app/components/Map/Map'), {
    loading: () => <Loader />,
    ssr: false,
  });

  return <Map customImage={customMap} />;
}

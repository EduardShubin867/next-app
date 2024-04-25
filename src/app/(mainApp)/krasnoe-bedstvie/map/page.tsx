'use client';
import customMap from '@/assets/maps/FOKAS2k.png';
import { Suspense, useEffect } from 'react';
import Loader from '@/app/(mainApp)/krasnoe-bedstvie/loader';
import { useAppSelector, useAppDispatch, useAppStore } from '@/app/lib/hooks';
import { fetchMarkers } from '@/app/lib/features/markers/markersSlice';
import { Alert } from 'flowbite-react';

import dynamic from 'next/dynamic';

export default function KrasnoeBedstvieMap() {
  const Map = dynamic(() => import('@/app/components/Map/Map'), {
    loading: () => <Loader />,
    ssr: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const markers = useAppSelector((state) => state.markers.markers);

  return <Map customImage={customMap} />;
}

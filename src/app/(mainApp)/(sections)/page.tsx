'use client';
import { useRouter } from 'next/navigation';
import { useEffect, FC } from 'react';

const KrasnoeBedstviePage: FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/map');
    }, [router]);

    return null;
};

export default KrasnoeBedstviePage;

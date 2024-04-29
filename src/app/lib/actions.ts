'use server';
import { ImageFile, TMarker } from '@/types/TMarker';
import mongodb from '@/app/lib/mongodb';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { LatLngExpression } from 'leaflet';

export async function getMarkers() {
    const db = await mongodb();

    const markers = await db.collection('krasnoe-bedstvie').find({}).toArray();

    return JSON.stringify(markers);
}

interface Marker {
    id: string;
    name: string;
    icon: string;
    description: string;
    images: Array<ImageFile> | string[];
    position: string[] | string;
    color: string;
    location: string;
}

export async function addMarker(newMarker: FormData, newMarkerFiles: FormData) {
    const db = await mongodb();
    const images = [];

    const files = newMarkerFiles.getAll('images[]') as unknown as File[];

    for (const file of files) {
        const fileName = nanoid();
        const fileExt = file.name.split('.').pop();
        const filePath = `./public/assets/images/map/${fileName}.${fileExt}`;

        try {
            const buffer = new Uint8Array(await file.arrayBuffer());
            await writeFile(filePath, buffer);
            images.push(`/assets/images/map/${fileName}.${fileExt}`);
        } catch (error) {
            console.log({ success: false, message: `Ошибка при загрузке файла ${file.name}: ${error}` });
        }
    }

    const newMarkerObj: Marker = { ...Object.fromEntries(newMarker), images } as Marker;

    newMarkerObj.position = JSON.parse(newMarkerObj.position as string);

    const res = await db.collection('krasnoe-bedstvie').insertOne(newMarkerObj);

    console.log('res', res);

    return JSON.stringify(newMarkerObj);
}

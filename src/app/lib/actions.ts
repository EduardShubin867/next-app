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

export async function addMarker(newMarker: string, newMarkerFiles: FormData) {
    const db = await mongodb();

    const newMarkerObj = JSON.parse(newMarker);

    const files = newMarkerFiles.getAll('images[]') as unknown as File[];

    for (const file of files) {
        const fileName = nanoid();
        const fileExt = file.name.split('.').pop();
        const filePath = `./public/assets/images/map/${fileName}.${fileExt}`;

        try {
            const buffer = new Uint8Array(await file.arrayBuffer());
            await writeFile(filePath, buffer);
            newMarkerObj.images.push(`/assets/images/map/${fileName}.${fileExt}`);
        } catch (error) {
            console.log({ success: false, message: `Ошибка при загрузке файла ${file.name}: ${error}` });
        }
    }

    try {
        await db.collection('krasnoe-bedstvie').insertOne(newMarkerObj);
    } catch (error) {
        return JSON.stringify({ succes: false, message: 'DB Error', error });
    }

    return JSON.stringify(newMarkerObj);
}

export async function updateMarker(marker: TMarker) {
    const db = await mongodb();
    const updateQuery = { id: marker.id };
    const newValues = { $set: { name: marker.name, description: marker.description } };

    try {
        await db.collection(marker.location).updateOne(updateQuery, newValues);
    } catch (error) {
        return JSON.stringify({ success: false, message: 'DB Error', error });
    }
    return JSON.stringify({ success: true });
}

export async function removeMarker(id: string, location: string) {
    const db = await mongodb();
    const query = { id };

    try {
        await db.collection(location).deleteOne(query);
    } catch (error) {
        const message = `Deleting is error ${error}`;
        console.error(message);
        return JSON.stringify({ success: false, message });
    }
    return JSON.stringify({ success: true });
}

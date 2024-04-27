'use server';
import { TMarker } from '@/types/TMarker';
import mongodb from '@/app/lib/mongodb';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';

export async function getMarkers() {
    const markers: TMarker[] = [
        {
            id: '66235586ba57c6d72560d855',
            name: 'dawd',
            icon: 'location_on_black_24dp',
            description: 'Some Description',
            position: [2.5, 7.2],
            images: [],
            color: 'black',
            location: 'Some Location',
        },
    ];

    return markers;
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
            images.push(`${fileName}.${fileExt}`);
        } catch (error) {
            console.log({ success: false, message: `Ошибка при загрузке файла ${file.name}: ${error}` });
        }
    }

    const newMarkerObj = { ...Object.fromEntries(newMarker), images };

    console.log(newMarkerObj);

    const res = await db.collection('krasnoe-bedstvie').insertOne(newMarkerObj);

    console.log('res', res);

    return JSON.stringify(newMarkerObj);
}

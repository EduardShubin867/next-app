'use server';

import { ImageFile, TMarker } from '@/types/TMarker';
import mongodb from '@/app/lib/mongodb';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import * as fs from 'node:fs/promises';
import * as sfc from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';
import { headers } from 'next/headers';

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
            //     // const buffer = new Uint8Array(await file.arrayBuffer());
            //     // await writeFile(filePath, buffer);
            //     // newMarkerObj.images.push(`/assets/images/map/${fileName}.${fileExt}`);
            const imageUrl = await uploadImageToImgur(file);
            console.log('imgurl', imageUrl);
            newMarkerObj.images.push(imageUrl);
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

export async function updateMarker(marker: TMarker, imageFiles: FormData) {
    const db = await mongodb();
    const updateQuery = { id: marker.id };
    const newValues = { $set: { name: marker.name, description: marker.description, images: marker.images } };
    const files = imageFiles.getAll('images[]') as unknown as File[];

    for (const file of files) {
        const fileName = nanoid();
        const fileExt = file.name.split('.').pop();
        const filePath = `./public/assets/images/map/${fileName}.${fileExt}`;

        try {
            const buffer = new Uint8Array(await file.arrayBuffer());
            await writeFile(filePath, buffer);
            marker.images.push(`/assets/images/map/${fileName}.${fileExt}`);
        } catch (error) {
            console.log({ success: false, message: `Ошибка при загрузке файла ${file.name}: ${error}` });
        }
    }

    try {
        await db.collection(marker.location).updateOne(updateQuery, newValues);
    } catch (error) {
        return JSON.stringify({ success: false, message: 'DB Error', error });
    }
    return JSON.stringify({ success: true, data: marker });
}

export async function removeMarker(id: string, location: string, images: string[]) {
    const db = await mongodb();
    const query = { id };

    try {
        await db.collection(location).deleteOne(query);
        const promises = images.map((image) => {
            // const filePath = path.resolve('./public/assets/images/map', image);
            const filePath = `./public${image}`;
            return fs.unlink(filePath);
        });
        await Promise.all(promises);
    } catch (error) {
        const message = `Deleting is error ${error}`;
        console.error(message);
        return JSON.stringify({ success: false, message });
    }
    return JSON.stringify({ success: true });
}

/**
 * Загружает изображение на Imgur и возвращает URL изображения.
 * @param {File} file - Файл изображения для загрузки.
 * @returns {Promise<string>} URL загруженного изображения.
 */
async function uploadImageToImgur(file: File) {
    const clientID = 'a07154a76a9f68b';
    const imgurEndpoint = 'https://api.imgur.com/3/image';

    const data = new FormData();
    data.append('image', file);
    data.append('type', 'image');
    data.append('title', `${file.name}`);
    data.append('description', `${file.name}`);
    const headersList = headers();
    const getHeaders = headersList.get('data');

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: `Client-ID ${clientID}`,
            getHeaders,
        },
        data: data,
    };

    axios(config)
        .then((res) => {
            console.log(res.data.data.link);
            return res.data.link;
        })
        .catch((error) => {
            console.error('Error uploading image to Imgur:', error);
            throw error;
        });

    // try {
    //     const response = await axios.post(imgurEndpoint, formData, {
    //         headers: {
    //             Authorization: `Client-ID ${clientID}`,
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });

    //     if (response.data.success) {
    //         return response.data.data.link; // Возвращает URL загруженного изображения
    //     } else {
    //         throw new Error('Imgur API returned an error: ' + response.data.status);
    //     }
    // } catch (error) {
    //     console.error('Error uploading image to Imgur:', error);
    //     throw error; // Переброс ошибки для дальнейшей обработки
    // }
}

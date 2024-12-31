'use server';

import axios from 'axios';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import * as fs from 'node:fs/promises';
import path from 'path';

import mongodb from '@/app/lib/mongodb';
import { TMarker } from '@/types/TMarker';

export async function getMarkers() {
  const db = await mongodb();

  const markers = await db.collection('krasnoe-bedstvie').find({}).toArray();

  return JSON.stringify(markers);
}

export async function addMarker(newMarker: string, newMarkerFiles: FormData) {
  const db = await mongodb();

  const newMarkerObj = JSON.parse(newMarker);

  const files = newMarkerFiles.getAll('images[]') as unknown as File[];

  for (const file of files) {
    try {
      if (process.env.NODE_ENV === 'development') {
        const fileName = nanoid();
        const fileExt = file.name.split('.').pop();
        const filePath = `./public/assets/images/map/${fileName}.${fileExt}`;
        const buffer = new Uint8Array(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        newMarkerObj.images.push(`/assets/images/map/${fileName}.${fileExt}`);
      } else {
        const imageUrl = await uploadImageToImgur(file);
        newMarkerObj.images.push(imageUrl);
      }
    } catch (error) {
      console.log({
        success: false,
        message: `Ошибка при загрузке файла ${file.name}: ${error}`,
      });
    }
  }

  try {
    await db.collection('krasnoe-bedstvie').insertOne(newMarkerObj);
  } catch (error) {
    return JSON.stringify({ succes: false, message: 'DB Error', error });
  }

  return JSON.stringify({ success: true, data: newMarkerObj });
}

export async function updateMarker(marker: TMarker, imageFiles: FormData) {
  const db = await mongodb();
  const filter = { id: marker.id };
  const update = {
    $set: {
      name: marker.name,
      description: marker.description,
      images: marker.images,
    },
  };

  const newImages = imageFiles.getAll('images[]') as unknown as File[];

  for (const file of newImages) {
    try {
      if (process.env.NODE_ENV === 'development') {
        const filePath = `./public/assets/images/map/${nanoid()}.${file.name.split('.').pop()}`;
        const buffer = new Uint8Array(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        marker.images.push(`/assets/images/map/${path.basename(filePath)}`);
      } else {
        const imageUrl = await uploadImageToImgur(file);
        marker.images.push(imageUrl);
      }
    } catch (error) {
      console.log({
        success: false,
        message: `Ошибка при загрузке файла ${file.name}: ${error}`,
      });
    }
  }

  try {
    await db.collection(marker.location).updateOne(filter, update);
  } catch (error) {
    return JSON.stringify({ success: false, message: 'DB Error', error });
  }
  return JSON.stringify({ success: true, data: marker });
}

export async function removeMarker(
  id: string,
  location: string,
  images: string[]
) {
  const db = await mongodb();
  const query = { id };

  try {
    if (process.env.NODE_ENV === 'development') {
      const promises = [
        db.collection(location).deleteOne(query),
        ...images.map((image) => fs.unlink(`./public${image}`)),
      ];
      await Promise.all(promises);
    } else {
      await db.collection(location).deleteOne(query);
    }
  } catch (error) {
    const message = `Deleting is error ${error}`;
    console.error(message);
    return JSON.stringify({ success: false, message });
  }
  return JSON.stringify({ success: true });
}

async function uploadImageToImgur(image: File): Promise<string> {
  const clientId = 'a07154a76a9f68b';
  const endpoint = 'https://api.imgur.com/3/image';

  const form = new FormData();
  form.append('image', image);
  form.append('type', 'image');
  form.append('name', image.name);
  form.append('title', image.name);

  const config = {
    method: 'post',
    headers: { Authorization: `Client-ID ${clientId}` },
    data: form,
  };

  const response = await axios.post(endpoint, form, config);
  return response.data.data.link;
}

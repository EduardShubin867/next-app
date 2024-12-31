'use server';

import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import * as fs from 'node:fs/promises';
import path from 'path';

import mongodb from '@/app/lib/mongodb';
import { TMarker } from '@/types/TMarker';

const collectionName = 'markers';

export async function getMarkers() {
  const db = await mongodb();

  const markers = await db.collection(collectionName).find({}).toArray();

  return JSON.stringify(markers);
}

export async function addMarker(newMarker: string, newMarkerFiles: FormData) {
  const db = await mongodb();

  const newMarkerObj = JSON.parse(newMarker);

  const files = newMarkerFiles.getAll('images[]') as unknown as File[];

  for (const file of files) {
    try {
      const fileName = nanoid();
      const fileExt = file.name.split('.').pop();
      const filePath = `./uploads/images/markerImages/${fileName}.${fileExt}`;
      const buffer = new Uint8Array(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      newMarkerObj.images.push(
        `/uploads/images/markerImages/${fileName}.${fileExt}`
      );
    } catch (error) {
      console.log({
        success: false,
        message: `Ошибка при загрузке файла ${file.name}: ${error}`,
      });
    }
  }

  try {
    await db.collection(collectionName).insertOne(newMarkerObj);
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

  const newImages = imageFiles.getAll('images[]') as File[];

  for (const file of newImages) {
    try {
      const filePath = `./uploads/images/markerImages/${nanoid()}.${file.name.split('.').pop()}`;
      const buffer = new Uint8Array(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      marker.images.push(
        `/uploads/images/markerImages/${path.basename(filePath)}`
      );
    } catch (error) {
      console.log({
        success: false,
        message: `Ошибка при загрузке файла ${file.name}: ${error}`,
      });
    }
  }

  try {
    await db.collection(collectionName).updateOne(filter, update);
  } catch (error) {
    return JSON.stringify({ success: false, message: 'DB Error', error });
  }
  return JSON.stringify({ success: true, data: marker });
}

export async function removeMarker(id: string, images: string[]) {
  const db = await mongodb();
  const query = { id };

  try {
    const promises = [
      db.collection(collectionName).deleteOne(query),
      ...images.map((image) => fs.unlink(`${image}`)),
    ];
    await Promise.all(promises);
  } catch (error) {
    const message = `Deleting is error ${error}`;
    console.error(message);
    return JSON.stringify({ success: false, message });
  }
  return JSON.stringify({ success: true });
}

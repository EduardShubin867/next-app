import axios from 'axios';

import { getMarkers } from '@/app/lib/actions';
import { TMarker } from '@/types/TMarker';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'http://localhost:3001';

interface MarkerState {
  markers: TMarker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

export const fetchMarkers = createAsyncThunk(
  'markers/fetchMarkers',
  async () => {
    const response = await getMarkers();

    return response;
  }
);

export const updateMarker = createAsyncThunk(
  'markers/updateMarker',
  async (marker: TMarker) => {
    const formData = new FormData();

    // marker.images.forEach((img, index) => {
    //     formData.append(`image[${index}]`, img, img.name);
    // });

    // Add data to FormData
    formData.append('id', marker.id);
    formData.append('name', marker.name);
    formData.append('description', marker.description);
    formData.append('location', marker.location);

    try {
      const response = await fetch(`${URL}/markers`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error processing request:', error);
      throw error;
    }
  }
);

export const deleteMarker = createAsyncThunk(
  'markers/deleteMarker',
  async (marker: TMarker) => {
    const response = await axios.delete(
      `${URL}/markers/${marker.id}/${marker.location}`
    );
    return response.data;
  }
);

const initialState: MarkerState = {
  markers: [],
  status: 'idle',
  error: undefined,
};

export const markersSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Get markers
      .addCase(fetchMarkers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarkers.fulfilled, (state) => {
        state.status = 'succeeded';

        // state.markers = state.markers.concat(action.payload);
      })
      .addCase(fetchMarkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update marker
      .addCase(updateMarker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMarker.fulfilled, (state, action) => {
        state.status = 'idle';
        const { id, name, description, img } = action.payload.marker;
        const existingMarker = state.markers.find((marker) => marker.id === id);
        if (existingMarker) {
          existingMarker.name = name;
          existingMarker.description = description;
          existingMarker.images = img;
        }
      })
      // Delete marker
      .addCase(deleteMarker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMarker.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.markers = state.markers.filter(
          (marker) => marker.id !== action.payload.id
        );
      });
  },
});

// export const selectAllMarkers = (state) => state.marker.markers;

export default markersSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMarker } from '@/types/TMarker';
import { getMarkers } from '@/app/lib/actions';

const URL = 'http://localhost:3001';

interface MarkerState {
    markers: TMarker[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}

interface MyErrorType {
    message: string;
}

export const fetchMarkers = createAsyncThunk('markers/fetchMarkers', async () => {
    const response = await getMarkers();

    return response;
});

export const addNewMarker = createAsyncThunk('markers/addNewMarker', async (newMarker: TMarker) => {
    const formData = new FormData();

    newMarker.images.forEach((img, index) => {
        formData.append(`image[${index}]`, img.file, img.file.name);
    });

    // Add data to FormData
    formData.append('id', newMarker.id);
    formData.append('name', newMarker.name);
    formData.append('icon', newMarker.icon);
    formData.append('description', newMarker.description);
    formData.append('img', JSON.stringify(newMarker.img));
    formData.append('position', JSON.stringify(newMarker.position));
    formData.append('color', newMarker.color);
    formData.append('location', newMarker.location);

    try {
        const response = await fetch(`${URL}/markers`, {
            method: 'POST',
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
});

export const updateMarker = createAsyncThunk('markers/updateMarker', async (marker: TMarker) => {
    const formData = new FormData();

    marker.images.forEach((img, index) => {
        formData.append(`image[${index}]`, img.file, img.file.name);
    });

    // Add data to FormData
    formData.append('id', marker.id);
    formData.append('name', marker.name);
    formData.append('description', marker.description);
    formData.append('img', JSON.stringify(marker.img));
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
});

export const deleteMarker = createAsyncThunk('markers/deleteMarker', async (marker: TMarker) => {
    const response = await axios.delete(`${URL}/markers/${marker.id}/${marker.location}`);
    return response.data;
});

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
            .addCase(fetchMarkers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMarkers.fulfilled, (state, action) => {
                state.status = 'succeeded';

                state.markers = state.markers.concat(action.payload);
            })
            .addCase(fetchMarkers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add marker
            .addCase(addNewMarker.fulfilled, (state, action) => {
                state.markers.push(action.payload.newMarker);
            })
            // Update marker
            .addCase(updateMarker.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateMarker.fulfilled, (state, action) => {
                state.status = 'idle';
                const { id, name, description, img } = action.payload.marker;
                const existingMarker = state.markers.find((marker) => marker.id === id);
                if (existingMarker) {
                    existingMarker.name = name;
                    existingMarker.description = description;
                    existingMarker.img = img;
                }
            })
            // Delete marker
            .addCase(deleteMarker.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteMarker.fulfilled, (state, action) => {
                state.status = 'succeeded';

                state.markers = state.markers.filter((marker) => marker.id !== action.payload.id);
            });
    },
});

// export const selectAllMarkers = (state) => state.marker.markers;

export default markersSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import markersReducer from './features/markers/markersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      markers: markersReducer,
    },
  });
};

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;

import { configureStore } from '@reduxjs/toolkit';
import { ticketsApi } from '../api/ticketsApi';

export const createAppStore = () =>
  configureStore({
    reducer: {
      [ticketsApi.reducerPath]: ticketsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ticketsApi.middleware),
  });

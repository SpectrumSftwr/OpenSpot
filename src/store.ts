import { configureStore } from '@reduxjs/toolkit';
import formSlice from './routes/userpages/formSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { combineReducers } from 'redux';

// Combine slices (in case you have more later)
const rootReducer = combineReducers({
  form: formSlice,
});

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['form'], // only persist the `form` slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Fix non-serializable action warnings caused by redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(reduxStore);

// Types
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

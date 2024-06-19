import { configureStore } from "@reduxjs/toolkit";
import showtimesReducer from '@/stores/showtimes_slice'

export const store = configureStore({
  reducer: {
    showtimes: showtimesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
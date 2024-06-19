import { createSlice, PayloadAction } from "@reduxjs/toolkit"

enum OrderSteps {
  SELECT_SHOWTIME = 0,
  SELECT_SEAT = 1,
  BUY_TICKET = 2
}

interface ShowtimesState {
  movieId: string
  showtimeId: string
  theaterId: string
  orderStep: OrderSteps
}

const initialState: ShowtimesState = {
  movieId: '',
  showtimeId: '',
  theaterId: '',
  orderStep: OrderSteps.SELECT_SHOWTIME
}

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload
    },
    setSelectedShowtime: (state, action: PayloadAction<{ theaterId: string, showtimeId: string }>) => {
      state.orderStep = 1    
      state.theaterId = action.payload.theaterId
      state.showtimeId = action.payload.showtimeId
    }
  }
})

export const { setMovieId, setSelectedShowtime } = showtimesSlice.actions
export default showtimesSlice.reducer
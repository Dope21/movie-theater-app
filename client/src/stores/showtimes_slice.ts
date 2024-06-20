import { createSlice, PayloadAction } from "@reduxjs/toolkit"

enum OrderSteps {
  SELECT_SHOWTIME = 0,
  SELECT_SEAT = 1,
  BUY_TICKET = 2
}

interface SelectedMovie {
  id: string
  title: string
  duration: number
  image: string
}

interface SelectedShowtime {
  theaterId: string
  theaterNumber: number
  showtimeId: string 
  showtime: string
}

interface SelectedSeat {
  name: string
  position: string
  price: number
}

interface ShowtimesState {
  selectedMovie: SelectedMovie
  selectedShowtime: SelectedShowtime
  selectedSeatList: SelectedSeat[]
  orderStep: OrderSteps
}

const initialState: ShowtimesState = {
  selectedMovie: {
    id: '',
    title: '',
    duration: 0,
    image: ''
  },
  selectedShowtime: {
    theaterId: '',
    theaterNumber: 0,
    showtimeId: '',
    showtime: ''
  },
  selectedSeatList: [],
  orderStep: OrderSteps.SELECT_SHOWTIME
}

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    resetShowtime: (state) => state = initialState,
    setSelectedMovie: (state, action: PayloadAction<SelectedMovie>) => {
      state.selectedMovie = action.payload
    },
    confirmShowtime: (state, action: PayloadAction<SelectedShowtime>) => {
      state.orderStep = 1    
      state.selectedShowtime = action.payload
    },
    setSelectedSeat: (state, action: PayloadAction<SelectedSeat>) => {
      state.selectedSeatList.push(action.payload)
    },
    removeSelectedSeat: (state, action: PayloadAction<SelectedSeat>) => {
      const filteredSeat = state.selectedSeatList.filter(item => item.position != action.payload.position)
      state.selectedSeatList = filteredSeat
    },
    confirmSeat: (state) => {
      state.orderStep = 2
    }
  }
})

export const { 
  confirmShowtime, 
  setSelectedMovie, 
  setSelectedSeat, 
  removeSelectedSeat,
  confirmSeat,
  resetShowtime
} = showtimesSlice.actions

export type { SelectedShowtime, SelectedSeat }

export default showtimesSlice.reducer
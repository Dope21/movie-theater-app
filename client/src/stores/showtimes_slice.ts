import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum OrderStep {
  SELECT_SHOWTIME = 0,
  SELECT_SEAT = 1,
  CONFIRM_ORDER = 2
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
  orderStep: OrderStep
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
  orderStep: 0
}

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    resetShowtime: () => initialState,
    setSelectedMovie: (state, action: PayloadAction<SelectedMovie>) => {
      state.selectedMovie = action.payload
    },
    setSelectedSeat: (state, action: PayloadAction<SelectedSeat>) => {
      state.selectedSeatList.push(action.payload)
    },
    removeSelectedSeat: (state, action: PayloadAction<SelectedSeat>) => {
      const filteredSeat = state.selectedSeatList.filter(item => item.position != action.payload.position)
      state.selectedSeatList = filteredSeat
    },
    confirmShowtime: (state, action: PayloadAction<SelectedShowtime>) => {
      state.orderStep = OrderStep.SELECT_SEAT    
      state.selectedShowtime = action.payload
    },
    confirmSeat: (state) => {
      state.orderStep = OrderStep.CONFIRM_ORDER
    },
    setPreviousStep: (state) => {
      if (state.orderStep === OrderStep.SELECT_SHOWTIME) {
        window.location.href = `/movie/${state.selectedMovie.id}`

      } else if (state.orderStep === OrderStep.SELECT_SEAT) {
        state.selectedShowtime
        state.orderStep = OrderStep.SELECT_SHOWTIME

      } else if (state.orderStep === OrderStep.CONFIRM_ORDER) {
        state.selectedSeatList = []
        state.orderStep = OrderStep.SELECT_SEAT
      }
    }
  }
})

export const { 
  setSelectedMovie, 
  setSelectedSeat, 
  removeSelectedSeat,
  confirmSeat,
  confirmShowtime, 
  resetShowtime,
  setPreviousStep
} = showtimesSlice.actions

export type { SelectedShowtime, SelectedSeat }

export default showtimesSlice.reducer
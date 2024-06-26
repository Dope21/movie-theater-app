'use client'

import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import OrderSteps from '@/components/select_showtime/order_steps'
import SelectShowtime from '@/components/select_showtime'
import SelectSeat from '@/components/select_seat'
import ConfirmOrder from '@/components/confirm_order'

interface ShowTimeProps {
  params: { id: string }
}

const ShowTime: React.FC<ShowTimeProps> = ({ params }) => {
  const orderStep = useSelector((state: RootState) => state.showtimes.orderStep)
  const DisplayStep = useCallback(() => {
    switch (orderStep) {
      case 0: return <SelectShowtime movieId={params.id} />
      case 1: return <SelectSeat />
      case 2: return <ConfirmOrder />
      default: return <div>There something wrong..</div>
    }
  }, [orderStep])

  return(
    <>
      <OrderSteps />
      {DisplayStep()}
    </>
  )
}

export default ShowTime
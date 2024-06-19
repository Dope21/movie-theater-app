'use client'

import OrderSteps from '@/components/select_showtime/order_steps'
import SelectShowtime from '@/components/select_showtime'

interface ShowTimeProps {
  params: { id: string }
}

const ShowTime: React.FC<ShowTimeProps> = ({ params }) => {
  
  return(
    <>
      <OrderSteps />
      <SelectShowtime movieId={params.id} />
    </>
  )
}

export default ShowTime
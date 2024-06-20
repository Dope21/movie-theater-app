import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { Flex, Button } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/stores"
import { resetShowtime } from "@/stores/showtimes_slice"
import { SelectedSeat } from '@/stores/showtimes_slice'
import SeatGroup from '@/components/confirm_order/seat_group'
import { CREATE_NEW_ORDER } from '@/components/confirm_order/types'

interface GroupedSeats {
  [key: string]: SelectedSeat[]
}

const SeatDetail = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [createOrder] = useMutation(CREATE_NEW_ORDER)
  const showtimeInfo = useSelector((state: RootState) => state.showtimes) 
  const totalPrices = showtimeInfo.selectedSeatList.reduce((acc, seat) => acc + seat.price, 0)
  const groupedSeatByType = showtimeInfo.selectedSeatList.reduce((acc: GroupedSeats, seat) => {
    const key = seat.name
    if (!acc[key]) { acc[key] = [] }
    acc[key].push(seat)
    return acc
  }, {})

  const handleConfirmOrder = async () => {
    try {
      const order = {
        userId: '664317f046073d14c4c6b1ae', // hard coded
        showAt: showtimeInfo.selectedShowtime.showtimeId,
        seats: showtimeInfo.selectedSeatList.map(({ price, position, name: seatType }) => ({ seatType, position })),
        totalSeats: showtimeInfo.selectedSeatList.length, 
        totalPrices: totalPrices
      }
      await createOrder({ variables: { order: order }})
      dispatch(resetShowtime())
      router.push('/')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div style={{ minWidth: 500 }}>
      <Flex justify='space-between' align='center'>
        <h3>Quantity</h3>
        <span>{showtimeInfo.selectedSeatList.length}</span>
      </Flex>

      <Flex vertical gap={16}>
        {Object.entries(groupedSeatByType).map(([key, value]) => (
          <SeatGroup key={key} name={key} seatList={value} />          
        ))}
      </Flex>

      <Flex align='center' justify='space-between' style={{ margin: '1rem 0' }}>
        <h3>Total Prices</h3>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{totalPrices.toLocaleString()} THB</span>
      </Flex>

      <div style={{ textAlign: 'center' }}>
        <Button type='primary' onClick={handleConfirmOrder}>Confirm Order</Button>
      </div>
    </div>
  )
}

export default SeatDetail
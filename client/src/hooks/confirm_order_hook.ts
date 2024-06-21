import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/stores"
import { resetShowtime } from '@/stores/showtimes_slice'
import { CREATE_NEW_ORDER } from '@/components/confirm_order/types'
import { SelectedSeat } from '@/stores/showtimes_slice'

interface GroupedSeats {
  [key: string]: SelectedSeat[]
}

const useConfirmOrder = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Create Order Success',
    })
  };
  
  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Sorry, something wrong!',
    })
  }

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
      const { data } = await createOrder({ variables: { order: order }})
      if (!data.createOrder.data) throw new Error()
      successMessage()
      setTimeout(() => {
        dispatch(resetShowtime())
        router.push('/')
      }, 1500)
    } catch(error) {
      errorMessage()
    }
  }

  return {
    showtimeInfo,
    totalPrices,
    groupedSeatByType,
    handleConfirmOrder,
    contextHolder
  }
}

export default useConfirmOrder
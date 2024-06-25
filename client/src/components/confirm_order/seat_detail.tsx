import { Flex, Button } from 'antd'
import SeatGroup from '@/components/confirm_order/seat_group'
import { useConfirmOrder } from '@/hooks'

const SeatDetail = () => {

  const { 
    showtimeInfo, 
    totalPrices, 
    groupedSeatByType, 
    handleConfirmOrder, 
    contextHolder
  } = useConfirmOrder()

  return (
    <>
     {contextHolder}
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
    </>
  )
}

export default SeatDetail
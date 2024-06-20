import styled from 'styled-components'
import { Card, Image, Flex, Tag, Button, message } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/stores'
import { confirmSeat } from '@/stores/showtimes_slice'
import React from 'react'

const StyledCard = styled(Card)`
  width: 400px;
  height: 450px;
  h3 { margin: 1rem 0 10px 0 }
  .ant-card-meta-title { white-space: pre-line; }
  .ant-card-body { padding: 1rem 1.25rem; }
`

const Title = styled.h2`
  font-weight: bold;
  white-space: pre-line;
  wordBreak: break-word;
  margin: 0 0 6px 0;
`

const SelectDetail: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch<AppDispatch>()
  const showtimeInfo = useSelector((state: RootState) => state.showtimes)
  const selectedSeatList = showtimeInfo.selectedSeatList.map((seat) => seat.position).join(', ')
  const totalPrices = showtimeInfo.selectedSeatList.reduce((acc, seat) => acc + seat.price, 0).toLocaleString()

  const handleConfirmSeat = () => {
    if (selectedSeatList) {
      dispatch(confirmSeat())
    } else {
      messageApi.open({
        type: 'error',
        content: 'Please select the seat!',
      })
    }
  }

  return (
    <>
     {contextHolder}
      <StyledCard title="Summary">
        <Flex gap={12}>
          <Image 
            src={showtimeInfo.selectedMovie.image} 
            width={150} 
            height={150} 
            style={{ objectFit: 'cover', borderRadius: 5 }} 
          />
          <div>
            <Title>{showtimeInfo.selectedMovie.title}</Title>
            <span>
              <Tag icon={<ClockCircleOutlined />}>
                {showtimeInfo.selectedMovie.duration + ' Minutes'}
              </Tag>
            </span>
          </div>
        </Flex>

        <div>
          <h3>Show Time</h3>
          <Flex justify='space-between'>
            <div>Theater: {showtimeInfo.selectedShowtime.theaterNumber}</div>
            <div><Tag>{showtimeInfo.selectedShowtime.showtime}</Tag></div>
          </Flex>
        </div>

        <div>
          <Flex justify='space-between' align='start' gap={12}>
            <div>
              <h3>Seats</h3>
              <div>{selectedSeatList || '-'}</div>
            </div>
            <div>
              <h3>Prices</h3>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{totalPrices}</span>
            </div>
          </Flex>
        </div>

        <Button 
          type='primary' 
          style={{ width: '100%', margin: '1rem 0' }}
          onClick={handleConfirmSeat}
        >
          Confirm
        </Button>
      </StyledCard>
    </> 
  )
}

export default SelectDetail
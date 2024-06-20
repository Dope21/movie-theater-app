import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import styled from 'styled-components'
import { Card, Flex, Image, Tag } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const StyledCard = styled(Card)`
  width: 400px;
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

const Summary = () => {
  const showtimeInfo = useSelector((state: RootState) => state.showtimes)

  return (
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
    </StyledCard>
  )
}

export default Summary
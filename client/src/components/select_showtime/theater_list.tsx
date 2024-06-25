import { Flex, Tag } from 'antd'
import { Theater } from '@/components/select_showtime/types'
import TimeButtonList from '@/components/select_showtime/time_button'

interface TheaterListProps {
  itemList: [Theater] | undefined
}

const TheaterList: React.FC<TheaterListProps> = ({ itemList }) => {

  return (
    <Flex vertical gap={32}>
      {itemList?.map((theater, key)=> (
        <div key={theater.theaterId + key} style={{ padding: '2rem', border: '0.5px solid #d9d9d9', borderRadius: 10 }}>

          <Flex style={{ marginBottom: 16 }} gap={12} align='center'>
            Theater: {theater.theaterNumber}
            <Tag>{theater.theaterType}</Tag>
          </Flex>

          <TimeButtonList theater={theater} />
        </div>
      ))} 
    </Flex>
  )
}

export default TheaterList
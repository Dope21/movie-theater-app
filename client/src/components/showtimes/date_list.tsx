import { Space } from 'antd'
import DateButton from '@/components/showtimes/date_button'

interface DateListProps {
  itemList: [string]
  fetchTheater: (date: string) => void
}

const DateList: React.FC<DateListProps> = ({ itemList, fetchTheater }) => {
  return (
    <Space style={{ marginBottom: '2rem' }}>
      {itemList.map((date, key) => (
        <DateButton key={key} date={date} onClick={() => fetchTheater(date)} />
      ))}
    </Space>
  )
}

export default DateList
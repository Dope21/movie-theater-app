import { Button } from 'antd'

interface DateButtonProps {
  date: string
  onClick: () => void
}

const DateButton: React.FC<DateButtonProps> = ({ date, onClick }) => {
  const dateObject = new Date(date)
  const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'short'})
  const dayOfMonth = dateObject.getDate()

  return(
    <Button onClick={onClick} style={{ padding: '1.5rem' }}>
      <div>
        <div>{dayOfWeek}.</div>
        <div>{dayOfMonth}</div>
      </div>
    </Button>
  ) 
}

export default DateButton
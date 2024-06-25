const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const formatDate = (dateString: string): string => {
  const dateObject = new Date(dateString)

  const day = dateObject.getDate()
  const month = dateObject.getMonth()
  const year = dateObject.getFullYear()

  const formattedDay = day < 10 ? '0' + day : day
  const formattedMonth = MONTHS[month]

  return `${formattedDay} ${formattedMonth} ${year}`
}

export default formatDate
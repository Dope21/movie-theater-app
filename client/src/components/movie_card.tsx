'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { Card } from 'antd'
import formatDate from '@/libs/format_date'

interface MovieCardProps {
  _id: string
  src: string
  title: string
  date: string
}

const { Meta } = Card

const StyledCard = styled(Card)`
  width: 200px;
  .ant-card-meta-title { white-space: pre-line; }
  .ant-card-body { padding: 0.5rem; }
`

const MovieCard = ({ _id, src, title, date }: MovieCardProps) => {
  const router = useRouter()
  const handleOnclick = () => router.push(`/movie/${_id}`)    

  return (
    <StyledCard
      onClick={handleOnclick}
      hoverable
      cover={<Image alt='movie' src={src} width={200} height={250} style={{ objectFit: 'cover' }} />}
    >
      <Meta title={title} description={formatDate(date)} />
    </StyledCard>
  )
}

export default MovieCard
'use client'

import { useRouter, usePathname } from 'next/navigation'
import styled from 'styled-components'
import { Image, Flex, Tag, Button } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import formatDate from '@/libs/format_date'

interface MovieCardWithDetailProps {
  title: string
  image: string
  duration: number
  tags: [string]
  startDate: string
}

const Title = styled.h2`
  font-weight: bold;
  white-space: pre-line;
  wordBreak: break-word;
  margin: 0 0 6px 0;
`

const MovieCardWithDetail: React.FC<MovieCardWithDetailProps> = ({ title, image, duration, tags, startDate }) => {
  const router = useRouter()
  const path = usePathname()
  const viewShowTime = () => router.push(`${path}/showtimes`)

  return (
    <Flex gap={16}>
      <Image
        style={{ objectFit: 'cover', borderRadius: '5px' }}
        width={200}
        height={250}
        src={image}
        alt='movie'
        preview={false}
      />
      <Flex vertical justify='space-between' style={{ maxWidth: 180 }}>
        <span style={{ fontSize: 18 }}>{formatDate(startDate)}</span>
        <div>
          <Title>{title}</Title>
          <span>{tags.map((value, index) => <Tag key={index}>{value}</Tag> )}</span>
        </div>
        <span><Tag icon={<ClockCircleOutlined />}>{duration + ' Minutes'}</Tag></span>
        <Button type='primary' onClick={viewShowTime}>View Show Time</Button>
      </Flex>
    </Flex>
  )
}

export default MovieCardWithDetail
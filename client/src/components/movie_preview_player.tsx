'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

interface MoviePreviewProps {
  url: string
}

const MoviePreviewPlayer: React.FC<MoviePreviewProps> = ({ url }) =>  {
  return <ReactPlayer 
    url={url} 
    playing 
    controls 
    muted 
    volume={1} 
  />
}

export default MoviePreviewPlayer
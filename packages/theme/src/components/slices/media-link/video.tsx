import * as React from 'react'

import { videoStyle } from './styles'

interface VideoPlayerProps {
  url?: string
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  if (!url) { return null; }

  return (
    <video
      css={videoStyle}
      controls 
    >
      <source src={url} type="video/mp4" />
    </video>
  )
}
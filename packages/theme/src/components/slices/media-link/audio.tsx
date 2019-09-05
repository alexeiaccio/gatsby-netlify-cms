import * as React from 'react'

import { audioStyle } from './styles'

interface AudioTrackProps {
  url?: string
}

export function AudioTrack({ url }: AudioTrackProps) {
  if (!url) { return null; }

  return (
    <video
      css={audioStyle}
      controls
    >
      <source src={url} type="audio/mp4" />
    </video>
  )
}
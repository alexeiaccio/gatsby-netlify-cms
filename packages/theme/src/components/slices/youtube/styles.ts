import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const videoFrameStyles = css`
  ${tw`
    relative
    w-full
    mt-8 mb-2
  `};
  padding-bottom: ${(1080 / 1920) * 100}%;

  & iframe {
    ${tw`
      absolute inset-0
      w-full h-full
    `};
  }
`

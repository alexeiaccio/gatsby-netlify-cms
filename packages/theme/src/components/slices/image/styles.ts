import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const figureStyles = css`
  ${tw`
    pt-8
    w-full
  `};
`

export const captionStyles = css`
  ${tw`
    pb-8 pt-2
    text-xs md:text-sm
  `};

  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

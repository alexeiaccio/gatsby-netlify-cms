import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const cardStyles = css`
  ${tw``};
`

export const imageWrapperStyles = css`
  ${tw`
    flex
    overflow-hidden
    pb-2/3
    relative
    w-full
  `};
`

export const imageStyles = css`
  ${tw`absolute inset-0 object-center object-cover`};
`

export const titleStyles = css`
  ${tw``};
`
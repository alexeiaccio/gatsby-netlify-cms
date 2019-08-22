import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const cardStyles = css`
  ${tw`w-full`};
`

export const imageWrapperStyles = css`
  ${tw`
    flex
    overflow-hidden
    relative
    w-full
  `};
  padding-bottom: ${(2 / 3) * 100}%;
`

export const imageStyles = css`
  ${tw`absolute inset-0 object-center object-cover`};
`

export const titleStyles = css`
  ${tw``};
`
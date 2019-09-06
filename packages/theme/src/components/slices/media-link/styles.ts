import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const imageWrapperStyles = css`
  ${tw`
    flex
    overflow-hidden
    relative
    w-full
  `};
  padding-bottom: 100%;
`

export const imageStyles = css`
  ${tw`absolute inset-0 object-center object-cover`};
`

export const imgStyles = css`
  ${tw`w-full h-full`};
`

export const audioStyle = css`
  ${tw`
    w-full
    h-12 max-h-12
  `};
`

export const videoStyle = css`
  ${tw`
    max-w-full
  `};
`

export const buttonStyles = css`
  ${tw`
    mt-4
    items-baseline
  `};
`

export const sizeStyles = css`
  ${tw`
    text-xxs
    text-green-400
  `};
`

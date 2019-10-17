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
    rounded-full
  `};
  padding-bottom: 100%;
`

export const imageStyles = css`
  ${tw`absolute inset-0 object-center object-cover`};
`

export const titleStyles = css`
  ${tw`
    font-sans font-bold
    text-xl
    mt-2
  `};
`

export const descriptionStyles = css`
  ${tw`
    text-sm
  `};
  color: var(--text-color);
`
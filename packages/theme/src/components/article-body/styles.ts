import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const imageWrapperStyles = css`
  ${tw`
    flex
    overflow-hidden
    relative
    w-full
  `};
  padding-bottom: ${(1200 / 1920) * 100}%;
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
    mb-8
    text-xs md:text-sm
    text-black
  `};
`
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const rowStyles = css`
  ${tw`mt-12`};
`

export const wrapperStyles = css`
  ${tw`
    w-full max-w-xs
    mx-auto
    pt-12
  `};
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
    text-3xl sm:text-5xl
    text-center
    mt-2
  `};
`

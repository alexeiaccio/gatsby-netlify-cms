import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const formStyles = css`
  ${tw`
    flex flex-col
    relative
  `};
`

export const inputStyles = css`
  ${tw`
    px-4 py-2
    mb-4
    border-green-500 border-4
    w-full
    outline-none focus:outline-none
    select-none
  `};
`

export const buttonStyles = css`
  ${tw`
    self-center
  `};
`

export const resultStyles = css`
  ${tw`
    absolute
    flex items-center justify-center
    w-full h-full
    bg-white
    font-semibold
  `};
  z-index: 101;
`

import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const rowStyles = css`
  ${tw`
    border-b
    border-t
    border-green-300
    mt-8
    pt-6
    pb-2
  `};
`

export const refStyles = css`
  ${tw`pb-4`};
`

export const buttonStyles = css`
  ${tw`
    font-sans
    bg-green-200 hover:bg-green-600
    outline-none focus:outline-none
    rounded-sm
    text-xxs
    hover:text-white
  `};
  padding: 0.05rem 0.35rem;
`

import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const popupStyles = css`
  ${tw`
    fixed inset-0 bottom-auto
    flex flex-col
    items-center justify-center
    bg-white
    border-4
    border-green-500
    m-4 md:m-8
    p-4 md:p-8
  `};
  z-index: 100;
`

export const fadeStyles = css`
  ${tw`
    fixed inset-0
    bg-black
    cursor-pointer
  `};
  opacity: 0.7;
  z-index: 99;
`

import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const roundedButtonTemplate = css`
  ${tw`
    bg-black
    border
    border-green
    border-solid
    cursor-pointer
    font-sans
    leading-none
    outline-none
    p-2
    rounded-sm
    select-none
    text-green
    text-xxs
    uppercase
  `};
`

export const outlinedTemplate = css`
  ${tw`
    inline-flex items-center justify-center
    border border-black border-solid
    outline-none
    select-none
    uppercase
    bg-white text-black
    font-sans
    hover:bg-black hover:text-white
  `};
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
`

export const buttonOutlined = css`
  ${outlinedTemplate};
  ${tw`px-4 py-2 text-sm`};
`

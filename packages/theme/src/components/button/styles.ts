import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const outlinedTemplate = css`
  ${tw`
    inline-flex items-center justify-center
    border border-solid
    outline-none focus:outline-none
    select-none
    uppercase
    font-sans
  `};
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
`

export const buttonOutlined = css`
  ${outlinedTemplate};
  ${tw`px-4 py-2 text-sm`};
`

export const smallButton = css`
  ${tw`
    font-sans
    outline-none focus:outline-none
    rounded-sm
    text-xxs
    hover:text-white
  `};
  background-color: var(--button-light-color);
  padding: 0.05rem 0.35rem;
  
`
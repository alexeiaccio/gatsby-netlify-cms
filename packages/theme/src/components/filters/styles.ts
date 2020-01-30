import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const listStyles = css`
  ${tw`
    flex flex-row flex-wrap
    items-start justify-start
    -mx-1 mt-8
  `};
  box-sizing: border-box;
`

export const itemStyles = css`
  ${tw`
    flex
    items-center justify-center
    mb-2
    px-1
  `};
  flex-grow: 1;
  flex-shrink: 0;
`

export const linkStyles = css`
  ${tw`
    font-sans
    px-2 py-1
    relative
    text-xs
    capitalize
  `};
  background-color: var(--button-light-color);
  flex-grow: 1;
  flex-shrink: 0;
  outline: none !important;
`


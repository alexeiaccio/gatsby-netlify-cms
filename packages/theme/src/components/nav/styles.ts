import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const navStyles = css`
  ${tw`
    flex flex-row flex-wrap
    items-center justify-center
    -mx-2
  `};
  box-sizing: border-box;
`

export const itemStyles = css`
  ${tw`
    flex
    items-center justify-center
    mb-2
    px-1
    w-auto
  `};
  flex-grow: 1;
  flex-shrink: 0;
`

export const buttonStyles = css`
  flex-grow: 1;
  flex-shrink: 0;
`
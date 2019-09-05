import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import Next from './next.svg'

export const slideStyles = css`
  ${tw`
    relative
    w-full
  `};
`

export const buttonStyles = css`
  ${tw`
    absolute inset-0
    bg-center bg-no-repeat
    cursor-pointer
    outline-none focus:outline-none
    opacity-0 hover:opacity-100
    w-1/2
  `};
  background-image: url(${Next});
`

export const prevStyles = css`
  ${buttonStyles};
  ${tw`right-auto`};
  transform: rotateZ(180deg);
`

export const nextStyles = css`
  ${buttonStyles};
  ${tw`left-auto`};
`

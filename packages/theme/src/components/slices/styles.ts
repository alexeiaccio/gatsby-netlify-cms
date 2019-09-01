import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import Next from './next.svg'

export const figureStyles = css`
  ${tw`
    pt-8
    w-full
  `};
`

export const captionStyles = css`
  ${tw`
    pb-8 pt-2
    text-xs md:text-sm
  `};

  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

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

export const leadStyles = css`
  ${tw`
    font-semibold italic
    text-left
    text-xl
    pt-8
  `};
`

export const textStyles = css`
  ${tw`
    pt-8
  `};
`

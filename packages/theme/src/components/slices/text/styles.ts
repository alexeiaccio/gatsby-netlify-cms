import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { smallButton } from '../../button/styles'

export const textStyles = css`
  ${tw`
    relative
    pt-8
  `};

  & .reference {
    ${smallButton};
  }
`

export const refStyles = css`
  ${tw`
    absolute
    bg-black
    p-4
    text-center
    text-white
    w-full
    z-10
  `};
  &:before {
    ${tw`
      absolute
      bg-black
      block
    `};
    content: '';
    top: -10px;
    height: 22px;
    width: 22px;
    transform: rotateZ(45deg);
  }

  & p {
    ${tw`text-center`};
  }
`

export const numStyles = css`
  ${tw`
    pb-2
  `};
`

import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const textStyles = css`
  ${tw`
    relative
    pt-8
  `};

  & .reference {
    ${tw`
      font-sans
      bg-green-200 hover:bg-green-600
      outline-none focus:outline-none
      rounded-sm
      text-xxs
      hover:text-white
    `};
    padding: 0.05rem 0.35rem;
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

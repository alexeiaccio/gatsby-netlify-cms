import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../main/index'
import * as eye from './eye.svg'
import * as burn from './burn.svg'

export const headerStyles = css`
  ${tw`
    flex flex-col
    items-center justify-start
    bg-black
    text-white
    w-full
    px-4 sm:px-8
  `};
`

export const imageWrapperStyles = css`
  ${tw`
    w-full max-w-2xl
    overflow-hidden
  `};
`

export const captionStyles = css`
  ${descriptionDefaults};
  ${tw`
    py-2
  `};
`

export const titleStyles = css`
  ${tw`
    font-sans font-bold
    text-xl
    mt-2
  `};
`

export const descriptionStyles = css`
  ${tw`
    mb-8
    text-xs md:text-sm
  `};

  & a {
    ${tw`
      text-green-500
      hover:text-green-500
    `};
  }
`

const iconStyles = css`
  ${tw`ml-1 pl-6 relative`};

  &::before {
    content: '';
    ${tw`
    absolute inset-0
    block
    bg-contain
    bg-center
    bg-no-repeat
    h-full w-6
  `};
  }
`

export const viewsStyles = css`
  ${iconStyles};

  &::before {
    background-image: url(${eye});
  }
`

export const burnsStyles = css`
  ${iconStyles};

  &::before {
    background-image: url(${burn});
  }
`

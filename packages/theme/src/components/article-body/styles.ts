import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../main/index'

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
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../main/index'

export const imageWrapperStyles = css`
  ${tw`
    w-full max-w-2xl
    overflow-hidden
    mb-8
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
    text-xs md:text-sm
    mb-8
  `};
  
  & a {
    color: var(--link-color) !important;
  }
`

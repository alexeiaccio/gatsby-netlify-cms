import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../main/index'

export const captionStyles = css`
  ${descriptionDefaults};
  ${tw`
    py-2
  `};
`

export const imageWrapperStyles = css`
  ${tw`
    flex
    overflow-hidden
    relative
    w-full
    rounded-sm
  `};
  padding-bottom: ${(1200 / 1920) * 100}%;
`

export const imageStyles = css`
  ${tw`absolute inset-0 object-center object-cover`};
`

export const descriptionStyles = css`
  ${tw`
    mb-8
    text-xs md:text-sm
  `};

  & a {
    color: var(--link-color) !important;
  }
`

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
    text-center
    text-xs
    uppercase
  `};
  background-color: var(--button-light-color);
  flex-grow: 1;
  flex-shrink: 0;
  outline: none !important;
`

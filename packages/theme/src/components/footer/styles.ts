import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import * as publicdomain from './publicdomain.svg'

export const footerStyles = css`
  ${tw`
    flex flex-col
    font-sans
    py-8 px-4 sm:px-8
    text-xxs
    text-white
  `};
`

export const rowStyles = css`
  ${tw`
    flex flex-row flex-wrap
    justify-between
    items-center
  `};
`

export const blockStyles = css`
  ${tw`
    inline-block
    whitespace-no-wrap
    align-middle
    py-2
  `};
`

export const publicStyles = css`
  ${tw`
    bg-contain
    bg-no-repeat
    inline-block
    align-middle
    w-4 h-4
    mx-2
  `};
  background-image: url(${publicdomain});
`

export const linkStyles = css`
  ${tw`
    font-semibold
    text-green-500
  `};
  font-variant: small-caps;
`

export const navStyles = css`
  ${tw`
    mb-6
  `};
`
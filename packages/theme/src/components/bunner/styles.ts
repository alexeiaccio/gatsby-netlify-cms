import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const bunnerStyles = css`
  ${tw`
    flex flex-row
    items-center justify-between
    bg-green-500
    select-none
    w-full
    py-2 px-4
  `};
`

export const buttonWrapperStyles = css`
  ${tw`
    flex flex-row flex-no-wrap
    ml-auto
  `};
`

export const closeStyles = css`
  ${tw`
    ml-2
  `};
`

import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const bunnerStyles = css`
  ${tw`
    flex flex-col
    items-center justify-between
    bg-green-500
    select-none
    w-full
    py-2 px-4
    font-sans
    relative
    z-10
  `};
`

export const textStyles = css`
  & > * {
    ${tw`my-8`};
  }
  & a {
    ${tw`underline`};
  }
`

export const buttonWrapperStyles = css`
  ${tw`
    flex flex-row flex-no-wrap
    mx-auto
    my-8
  `};
`

export const closeStyles = css`
  ${tw`
    ml-2
    self-end
  `};
`

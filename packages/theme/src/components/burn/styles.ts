import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const wrapperStyles = css`
  ${tw`
    flex flex-row flex-no-wrap
    items-center justify-center
  `};
`

export const countStyles = css`
  ${tw`
    font-sans font-semibold
    px-4
    text-xxs sm:text-xs
  `};
`

export const burnStyles = css`
  ${tw`
    cursor-pointer
  `};

  & circle {

  }

  & > * {
    transition: all 200ms ease-in-out;
  }
`

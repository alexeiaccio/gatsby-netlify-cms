import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const headerStyles = css`
  ${tw`
    flex flex-col items-center
    bg-black
    select-none
    w-full
  `};
`

export const navStyles = css`
  ${tw`max-w-lg my-4`};
`

export const runnerStyles = css`
  ${tw`
    text-green-500 text-xs
    font-sans
    overflow-hidden
    w-full
    whitespace-no-wrap
  `};
`

export const titleStyles = css`
  ${tw`
    text-white text-xl
    font-sans font-semibold tracking-wide
  `};
`
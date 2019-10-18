import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { headingStyles } from '../main/index'

export const headerStyles = css`
  ${tw`
    relative
    bg-black
    select-none
    w-full
    text-center
  `};
`

export const stickedStyles = css`
  ${tw`
    fixed
    inset-0 bottom-auto
    z-50
  `};
  transform: translateY(-100%);
  transition: transform 200ms ease-in-out;
`

export const fadeStyles = css`
  ${tw`
    fixed inset-0
    bg-black
  `};
  opacity: 0.7;
  z-index: 49;
`

export const navStyles = css`
  ${tw`
    max-w-2xl 
    mt-4 mx-auto
    px-6
  `};
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
    flex flex-col items-center
    font-sans font-semibold
    tracking-wide
    text-white text-xl
  `};
`

export const openerStyles = css`
  ${tw`
    absolute
  `};
  right: 0.8rem;
  top: 0.65rem;
  font-variant: small-caps;
`

export const themeToggle = css`
  ${tw`
    absolute
  `};
  left: 0.8rem;
  top: 0.65rem;
`

export const menuStyles = css`
  ${tw`
    flex flex-row flex-wrap
    items-center justify-between
    my-4 mx-auto
    px-5
    text-white
    w-full max-w-2xl
  `};
`

export const linkStyles = css`
  ${tw`
    font-sans
    font-semibold
    text-green-500
    text-xxs
  `};
  font-variant: small-caps;
`

export const formStyles = css`
  ${tw`
    mt-auto
    w-full max-w-sm
  `};
`

export const formHeadingStyles = css`
  ${headingStyles};
  ${tw`
    py-4
    text-xl
    text-center
  `};
`

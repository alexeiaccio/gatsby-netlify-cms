import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const searchStyles = css`
  ${tw`pt-8`};
`

export const Input = styled('input')`
  ${tw`
    bg-white
    flex
    font-sans
    border-4
    border-green-200
    border-solid
    items-center
    justify-center
    outline-none
    px-4
    py-2
    text-black text-xs
    w-full
    focus:border-green-500
  `};
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
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
    text-xs
  `};
  background-color: var(--button-light-color);
  flex-grow: 1;
  flex-shrink: 0;
  outline: none !important;
`

export const sectionStyles = css`
  ${tw`max-w-2xl`};
`

export const leadStyles = css`
  ${tw`font-semibold text-lg`};
`

export const rowStyles = css`
  ${tw`mt-8`};
`

export const buttonStyles = css`
  ${tw`
    mt-2
    text-center
    w-full
  `};
`

export const matchedStyles = css`
  ${tw`
    absolute inset-0
    flex items-center justify-center
    p-4
    text-white
    text-sm
  `};
  background: rgba(0, 0, 0, 0.75);

  & .matched {
    ${tw`
      bg-green-600
      p-1
    `};
  }
`

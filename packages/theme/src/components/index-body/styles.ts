import { css } from '@emotion/core'
import tw from 'tailwind.macro'

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

export const highlightStyles = css`
  ${tw`
    block
    mx-auto 
    max-w-2xl
    px-3
  `};
`

export const highlightWrapperStyles = css`
  ${tw`
    overflow-hidden
    relative
  `};

  &::after {
    ${tw`
      absolute
      inset-0
    `};
    background-color: var(--bg-color);
    content: '';
    opacity: 0;
    transition: opacity 400ms ease-in-out;
  }

  &:hover::after {
    opacity: 0.66;
  }
`

export const highlightTextStyles = css`
  ${tw`
    absolute
    inset-0 top-auto
    py-8
    z-10
  `};
  color: var(--text-color);
`

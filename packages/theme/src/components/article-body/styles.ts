import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const headerStyles = css`
  ${tw`
    flex flex-col
    items-center justify-start
    bg-black
    text-white
    w-full
  `};
`

export const imageWrapperStyles = css`
  ${tw`
    relative
    w-full max-w-2xl
    overflow-hidden
  `};
`

export const captionStyles = css`
  ${tw`
    absolute inset-0 top-auto
    py-2 px-4
    text-xs md:text-sm
  `};
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transform: translateY(10%);
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 1;
    transform: translateY(0%);
  }
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
    mb-8
    text-xs md:text-sm
  `};

  & a {
    ${tw`
      text-green-500
      hover:text-green-500
    `};
  }
`
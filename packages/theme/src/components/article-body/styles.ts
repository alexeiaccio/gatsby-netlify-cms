import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../main/index'

export const headerStyles = css`
  ${tw`
    flex flex-col
    items-center justify-start
    w-full
    px-4 sm:px-8
    bg-black
    text-white
  `};

  & a {
    ${tw`
      text-green-500
      hover:text-green-500
    `};
  }
`

export const onIndexStyles =  css`
  ${tw`
    bg-white
    text-black
  `};

  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

export const imageWrapperStyles = css`
  ${tw`
    w-full max-w-2xl
    overflow-hidden
  `};
`

export const captionStyles = css`
  ${descriptionDefaults};
  ${tw`
    py-2
  `};
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
`

export const Icon = styled.span`
  ${tw`ml-1 pl-6 relative`};

  &::before {
    content: '';
    ${tw`
      absolute inset-0
      block
      bg-contain
      bg-center
      bg-no-repeat
      h-full w-6
  `};
  }
`

export const footerStyles = css`
  ${tw`
    py-8
    font-sans
  `}
`

export const discussStyles = css`
  ${tw`
    mt-8
    text-center
  `}
`

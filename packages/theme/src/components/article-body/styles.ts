import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { get } from 'lodash'

import { descriptionDefaults } from '../main/index'

const backStyles = props => css`
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.75) 35%, rgba(0, 0, 0, 0.6) 65%, rgba(0, 0, 0, 0.99) 100%),
      url(${get(props.image, 'localFile.childImageSharp.fluid.src', get(props.image, 'url'))});
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

export const Header = styled.div`
  ${tw`
    flex flex-col
    items-center justify-start
    w-full
    px-4 sm:px-8
    bg-black
    text-white
    bg-cover
  `};
  ${props => !props.onIndex && backStyles};
  ${props => props.onIndex && onIndexStyles};

  & a {
    ${tw`
      text-green-500
      hover:text-green-500
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

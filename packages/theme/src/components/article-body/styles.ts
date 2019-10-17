import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { get } from 'lodash'

import { descriptionDefaults } from '../main/index'

const blackStyles = props => css`
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.8) 65%, rgba(0, 0, 0, 0.99) 100%),
    url(${get(props.image, 'localFile.childImageSharp.fluid.src', get(props.image, 'url'))});
  
  & a {
    ${tw`
      text-green-500
      hover:text-green-500
    `};
  }
`

export const whiteStyles =  css`
  background-color: var(--bg-color);
  color: var(--text-color);

  & a {
    color: var(--link-color) !important;
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
  ${props => !props.white && blackStyles};
  ${props => props.white && whiteStyles};
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

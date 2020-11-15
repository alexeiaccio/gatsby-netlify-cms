import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { get } from 'lodash'

import { descriptionDefaults } from '../main/index'

const blackStyles = props => css`
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.8) 65%, rgba(0, 0, 0, 0.99) 100%),
    url(${props.image});
  
  & a {
    ${tw`text-green-500 hover:text-green-500`};
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
  ${tw`flex flex-col items-center justify-start w-full px-4 text-white bg-black bg-cover sm:px-8`};
  ${props => !props.white && blackStyles};
  ${props => props.white && whiteStyles};
`

export const imageWrapperStyles = css`
  ${tw`w-full max-w-2xl overflow-hidden `};
`

export const captionStyles = css`
  ${descriptionDefaults};
  ${tw`py-2 `};
`

export const titleStyles = css`
  ${tw`mt-2 font-sans text-xl font-bold `};
`

export const descriptionStyles = css`
  ${tw`mb-8 text-xs md:text-sm`};
`

export const Icon = styled.span`
  ${tw`relative pl-6 ml-1`};

  &::before {
    content: '';
    ${tw`absolute inset-0 block w-6 h-full bg-center bg-no-repeat bg-contain `};
  }
`

export const footerStyles = css`
  ${tw`py-8 font-sans `}
`

export const discussStyles = css`
  ${tw`mt-8 text-center `}
`

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const headingStyles = css`
  ${tw`
    font-sans
    font-bold
  `};
`

export const Main = styled.main`
  ${tw`
    font-serif font-medium
    mx-auto mb-10
    px-4 sm:px-8
    w-full max-w-2xl
  `};

  & a {
    ${tw`
      hover:text-green-600
    `};
  }
`

export const TextContainer = styled.div`
  ${tw`
    mx-auto
    w-full max-w-lg
    text-justify
  `};

  & h1 {
    ${headingStyles};
    ${tw`
      text-4xl
      mt-12 mb-4
    `};
  }
  & h2 {
    ${headingStyles};
    ${tw`
      text-2xl
      mt-10 mb-3
    `};
  }
  & h3 {
    ${headingStyles};
    ${tw`
      text-xl
      mt-8 mb-2
    `};
  }
`
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const headingStyles = css`
  ${tw`
    font-sans
    font-bold
    leading-tight
  `};
`

export const Main = styled.main`
  ${tw`
    font-serif font-medium
    w-full
  `};
`

export const Wrapper = styled.div`
  ${tw`
    bg-white text-black
    w-full
  `};
`

export const Container = styled.div`
  ${tw`
    mx-auto 
    pb-10 px-4 sm:px-8
    max-w-2xl
  `};

  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

export const TextContainer = styled.div`
  ${tw`
    mx-auto
    w-full max-w-lg
    subpixel-antialiased
  `};

  & h1 {
    ${headingStyles};
    ${tw`
      text-5xl
      pt-12 pb-4
    `};
  }
  & h2 {
    ${headingStyles};
    ${tw`
      text-3xl
      pt-10 pb-3
    `};
  }
  & h3 {
    ${headingStyles};
    ${tw`
      text-xl
      pt-8 pb-2
    `};
  }
  & p {
    ${tw`
      pb-4
      text-justify
    `};
  }
`
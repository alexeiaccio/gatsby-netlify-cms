import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const headingStyles = css`
  ${tw`
    font-sans
    font-bold
    leading-tight
  `};
`

const themeColors = props => css`
  ${props.isDark && `
    --bg-color: #000;
    --text-color: #FFF;
    --link-color: #0cf3ad;
    --button-light-color: #08a676;
    --gray-light-color: #2d3748;
  `};
`

export const Main = styled.main`
  ${tw`
    font-serif font-medium
    w-full
  `};
  ${themeColors};
`

export const Wrapper = styled.div`
  ${tw`
    w-full
  `};
  background-color: var(--bg-color);
  color: var(--text-color);
`

export const Container = styled.div`
  ${tw`
    mx-auto 
    pb-12 px-4
    max-w-2xl
  `};
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
      text-3xl sm:text-5xl
      pt-12 pb-4
    `};
  }
  & h2 {
    ${headingStyles};
    ${tw`
      text-2xl sm:text-3xl
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
      text-justify
    `};
    &:not(:last-of-type) {
      ${tw`
        pb-4
    `};
    }
    & a {
      ${tw`
        text-green-600
        hover:text-green-600
      `};
    }
  }
`

export const descriptionDefaults = css`
  ${tw`
    mx-auto
    w-full max-w-lg
    subpixel-antialiased
    text-xs sm:text-sm
  `};
`

export const descriptionStyles = css`
  ${tw`
    text-xs sm:text-sm
  `};

  & h1 {
    ${headingStyles};
    ${tw`
      text-2xl sm:text-3xl
      pt-10 pb-3
    `};
  }
  & h2 {
    ${headingStyles};
    ${tw`
      text-xl sm:text-2xl
      pt-8 pb-2
    `};
  }
  & h3 {
    ${headingStyles};
    ${tw`
      text-lg
      pt-6 pb-1
    `};
  }
  & p {
    ${tw`
      text-justify
    `};
    &:not(:last-of-type) {
      ${tw`
        pb-3
    `};
    }
  }
  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

export const DescriptionContainer = styled.div`
  ${descriptionDefaults};
  ${descriptionStyles};
`
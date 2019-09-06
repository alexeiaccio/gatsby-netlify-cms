import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export const figureStyles = css`
  ${tw`
    border-b
    border-t
    border-green-300
    mt-8
  `};
`

export const quoteStyles = css`
  ${tw`pt-6`};

  & p {
    ${tw`
      font-semibold italic
      text-left
      text-xl
    `};
  }
`

export const citeStyles = css`
  ${tw`mt-4 mb-6`};

  & p {
    ${tw`
      text-right
    `};
  }
`

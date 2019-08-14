import { css } from '@emotion/core'
import tw from 'tailwind.macro'

export default css`
  html, .theme {
    ${tw`font-serif`};
    font-size: calc(18px + 6 * ((100vw - 320px) / 1280));
  }
`

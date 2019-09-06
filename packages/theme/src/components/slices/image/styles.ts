import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { descriptionDefaults } from '../../main/index'

export const figureStyles = css`
  ${tw`
    pt-8
    w-full
  `};
`

export const captionStyles = css`
  ${descriptionDefaults};
  ${tw`
    pb-8 pt-2
  `};

  & a {
    ${tw`
      text-green-600
      hover:text-green-600
    `};
  }
`

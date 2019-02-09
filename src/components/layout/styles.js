import { css } from '@emotion/core'

import logo from '../../img/logo.svg'

export const bannerWrapperStyles = css`
  ${tw(['bg-green', 'overflow-hidden', 'w-full'])};
  box-sizing: border-box;
`

export const headerWrapperStyles = css`
  ${tw([
    'fixed',
    'pin-l',
    'pin-r',
    'pin-t',
  ])};
  &::before {
    ${tw([
      'bg-black',
      'fixed',
      'h-q144',
      'pin-l',
      'pin-r',
      'pin-t',
    ])};
    content: '';
    transform: translateY(-9rem);
  }
`

export const headerStyles = css`
  ${tw(['bg-black'])};
`

export const logoWrapperStyle = css`
  ${tw([
    'flex',
    'flex-row',
    'h-q112',
    'items-center',
    'justify-center',
    'overflow-hidden',
    'w-full',
  ])};
`

export const logoStyles = css`
  ${tw(['bg-center', 'bg-contain', 'bg-no-repeat'])};
  background-image: url(${logo});
  height: 30px;
  transform: rotateZ(90deg);
  width: 60px;
`

export const menuWrapperStyle = css`
  ${tw(['overflow-hidden'])};
`

export const topBlockWrapperStyles = css`
  ${tw(['overflow-hidden', 'w-full'])};
  box-sizing: border-box;
  will-change: height;
`

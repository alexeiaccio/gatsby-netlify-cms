import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'

export function Header() {
  return (
    <div css={css`${tw`w-full bg-black text-white`};`}>
      <Logo />
      <div>·К·Р·А·П·И·В·А·</div>
    </div>
  )
}
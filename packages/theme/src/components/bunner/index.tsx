import * as React from 'react'
import { get } from 'lodash'

import { Button } from '../button/index'
import { HTML } from '../html/index'
import { LinkButton } from '../button/link'

import { bunnerStyles, textStyles, buttonWrapperStyles, closeStyles } from './styles'

interface BunnerProps {
  bunner?: {
    bannerbutton?: string
    expiredate?: number
    bannertext?: {
      html: string
    }
    bannerlink?: {
      url: string
      target: string
    }
  }
  atFooter?: boolean
  onClick: () => void
}

export function Bunner({ bunner, onClick, atFooter }: BunnerProps) {
  if (!bunner) { return null }

  return (
    <div css={bunnerStyles}>
      <HTML css={textStyles}>
        {get(bunner, 'bannertext.html')}
      </HTML>
      <div css={buttonWrapperStyles}>
        <LinkButton
          color="#08a676"
          rounded={0.25}
          href={get(bunner, 'bannerlink.url')}
          target={get(bunner, 'bannerlink.target', '_blank')}
        >
          {get(bunner, 'bannerbutton', 'Перейти')}
        </LinkButton>
        {!atFooter && (
          <Button
            inverted
            color="#08a676"
            css={closeStyles}
            rounded={0.25}
            onClick={onClick}
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  )
}

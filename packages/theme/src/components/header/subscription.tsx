import * as React from 'react'
import { useClickAway } from 'react-use'

import { Button } from '../button/index'
import { Popup } from '../popup/index'
import { SubscriptionForm } from '../subscription/index'

import { formStyles, formHeadingStyles, openerStyles } from './styles'

export function Subcribtion({ opened, onClose }) {
  if (!opened) { return null }

  const ref = React.useRef(null)
  useClickAway(ref, () => {
    onClose()
  })

  const styles = {
    color: '#0cf3ad',
    inverted: false,
    contrast: false,
    rounded: 0.125,
    size: 0.5,
  }

  return (
    <Popup ref={ref}>
      <Button
        css={openerStyles}
        onClick={onClose}
        {...styles}
      >
        закрыть
      </Button>
      <div css={formStyles}>
        <h4 css={formHeadingStyles}>Подписаться на обновления</h4>
        <SubscriptionForm />
      </div>
    </Popup>
  )
} 
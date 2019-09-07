import * as React from 'react'
import { useUpdateEffect } from 'react-use'

import { Button } from '../button/index'
import { MetaContext } from '../layout/index'

import { openerStyles } from './styles'

interface OpenerProps {
  onClick: () => void
  opened: boolean
  sticked: boolean
}

export function Opener({ onClick, sticked, opened }: OpenerProps) {
  const { location } = React.useContext(MetaContext)
  const [isOpen, setIsOpen] = React.useState(location.pathname === '/')

  useUpdateEffect(() => {
    setIsOpen((!sticked && location.pathname === '/') || opened)
  }, [sticked, opened])

  const styles = {
    color: '#0cf3ad',
    inverted: false,
    contrast: true,
    rounded: 0.125,
    size: 0.5,
  }

  if (!sticked && location.pathname === '/') { return null }

  return (
    <Button
      css={openerStyles}
      onClick={onClick}
      {...styles}
    >
      {isOpen ? 'закрыть' : 'меню'}
    </Button>
  )
}
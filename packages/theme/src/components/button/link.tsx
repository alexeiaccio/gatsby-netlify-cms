import * as React from 'react'

import { Button, ButtonProps } from './index'

export function LinkButton({
  component = 'a',
  children,
  to,
  href,
  rel,
  target,
  ...args
}: ButtonProps): JSX.Element {
  let props = {}

  if (to) { props = { ...props, to } }
  if (href) { props = { ...props, href } }
  if (rel) { props = { ...props, rel } }
  if (target) { props = { ...props, target } }

  return (
    <Button
      component={component}
      {...props}
      {...args}
    >
      {children}
    </Button>
  )
}
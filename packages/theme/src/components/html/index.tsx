import * as React from 'react'

interface HTMLProps {
  children: string | any | {}
  css?: any
  key?: string
}

export const HTML = ({ children, ...props }: HTMLProps) => (
  <div {...props} dangerouslySetInnerHTML={{ __html: children }} />
)

export const SpanHTML = ({ children }: HTMLProps) => (
  <span dangerouslySetInnerHTML={{ __html: children.replace(/<\/?p/g, '<span') }} />
)

export const HTMLRef = React.forwardRef(({ children, ...props }: HTMLProps, ref: any) => (
  <div
    ref={ref}
    {...props}
    dangerouslySetInnerHTML={{ __html: children }}
  />
))
